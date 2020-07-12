import Scenario from './Scenario';
import FolderController from './FolderController';
import Puppeteer from './Puppeteer';
import ImagesComparer from './ImagesComparer';
import FileSystem from './FileSystem';
import PathHelper from './Helpers/PathHelper';

class ScenarioRunner {
	scenario: Scenario;
	pathToScenario: string;
	puppeteer: Puppeteer;

	constructor(pathToScenario: string) {
		this.scenario = new Scenario();
		this.pathToScenario = pathToScenario;
	}

	loadScenarios(): boolean {
		if (
			this.scenario.checkScenarioAvailability(this.pathToScenario) ===
			false
		) {
			//log error
			return false;
		}

		this.scenario.loadScenario(this.pathToScenario);

		if (this.scenario.isScenarioParsedSuccessfully() === false) {
			//log error
			return false;
		}

		return true;
	}

	async runScenarios(): Promise<boolean> {
		if (this.createFolders() == false) {
			return false;
		}

		await this.puppeteer.start();

		this.runner();

		await this.puppeteer.closeBrowser();
	}

	createFolders(): boolean {
		const folderController = new FolderController();
		//fixme:
		if (folderController.createBaselineFolder('') == false) {
			//log error
			return false;
		}

		//fixme:
		if (
			folderController.recreateOutputAndActualStatusFolders('', '') ==
			false
		) {
			//log error
			return false;
		}

		return true;
	}

	async runner(): Promise<void> {
		for (let i = 0; i < this.scenario.steps.length; i++) {
			// this.scenario.steps[i]; 1 step
			for (const substep of this.scenario.steps[i]) {
				await this.puppeteer.goto(substep);
			}
			// await this.puppeteer.screenshot(this.scenario.imagesToAnalyze[i]);

			if (
				//baseline exsists
				FileSystem.checkAvailability(this.scenario.imagesToAnalyze[i])
			) {
				const actualStatusPath = PathHelper.getActualStatusImage(
					this.scenario.imagesToAnalyze[i],
				);
				await this.puppeteer.screenshot(actualStatusPath);
				const result = await this.compareImages(
					this.scenario.imagesToAnalyze[i],
					actualStatusPath,
				);

				//log results
			} else {
				//baseline not exists yet
				await this.puppeteer.screenshot(
					this.scenario.imagesToAnalyze[i],
				);
				//create baseline
			}
		}
	}

	async compareImages(
		pathToOriginalImage: string,
		pathToComaredImage: string,
	): Promise<{
		rawMisMatchPercentage: number;
		misMatchPercentage: string;
		resultBuffer: Buffer;
	}> {
		const originalImageBuffer = FileSystem.readFile(pathToOriginalImage);
		if (originalImageBuffer.status == false) {
			//log error
			return {
				rawMisMatchPercentage: 0,
				misMatchPercentage: '0',
				resultBuffer: new Buffer(''),
			};
		}

		const comparedImageBuffer = FileSystem.readFile(pathToComaredImage);
		if (comparedImageBuffer.status == false) {
			//log error
			return {
				rawMisMatchPercentage: 0,
				misMatchPercentage: '0',
				resultBuffer: new Buffer(''),
			};
		}

		const imagesComparer = new ImagesComparer();

		const result = await imagesComparer.compareImages(
			originalImageBuffer.fileContent,
			comparedImageBuffer.fileContent,
		);
		const rawMisMatchPercentage = result.rawMisMatchPercentage;
		const misMatchPercentage = result.misMatchPercentage;
		const resultBuffer = result.buffer;

		return {
			rawMisMatchPercentage: rawMisMatchPercentage,
			misMatchPercentage: misMatchPercentage,
			resultBuffer: resultBuffer,
		};
	}
}

export default ScenarioRunner;

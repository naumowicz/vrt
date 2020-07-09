import Scenario from './Scenario';
import FolderController from './FolderController';
import Puppeteer from './Puppeteer';
import ImagesComparer from './ImagesComparer';
import FileSystem from './FileSystem';

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
	}

	async runScenarios(): Promise<boolean> {
		if (this.createFolders() == false) {
			return false;
		}

		//fixme: configuration
		await this.puppeteer.start(configuration);

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

	runner(): void {}

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

		const result = imagesComparer.compareImages(
			originalImageBuffer.fileContent,
			comparedImageBuffer.fileContent,
		);
		const rawMisMatchPercentage = (await result).rawMisMatchPercentage;
		const misMatchPercentage = (await result).misMatchPercentage;
		const resultBuffer = (await result).buffer;

		return {
			rawMisMatchPercentage: rawMisMatchPercentage,
			misMatchPercentage: misMatchPercentage,
			resultBuffer: await resultBuffer,
		};
	}
}

export default ScenarioRunner;

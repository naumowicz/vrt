import Scenario from './Scenario';
import FolderController from './FolderController';
import Puppeteer from './VRTPuppeteer';
import ImagesComparer from './ImagesComparer';
import FileSystem from './FileSystem';
import PathHelper from './Helpers/PathHelper';
import VRTPuppeteer from './VRTPuppeteer';
import globalSettings from '../GlobalSettings';

class ScenarioRunner {
	scenario: Scenario;
	pathToScenario: string;
	puppeteer: Puppeteer;

	constructor(pathToScenario: string) {
		this.scenario = new Scenario();
		this.pathToScenario = pathToScenario;
		this.puppeteer = new VRTPuppeteer(globalSettings.puppeteerConfigPath);
	}

	async loadScenarios(): Promise<boolean> {
		if (
			this.scenario.checkScenarioAvailability(this.pathToScenario) ===
			false
		) {
			//log error
			return false;
		}

		await this.scenario.loadScenario(this.pathToScenario);

		if (this.scenario.isScenarioParsedSuccessfully() === false) {
			//log error
			return false;
		}

		return true;
	}

	async runScenarios(): Promise<boolean> {
		if (this.createFolders() === false) {
			return false;
		}

		await this.puppeteer.start();

		await this.runner();

		await this.puppeteer.closeBrowser();

		return true;
	}

	createFolders(): boolean {
		if (this.scenario.imagesToAnalyze.length === 0) {
			//fix me: report error
			return false;
		}

		const folderController = new FolderController();
		if (
			folderController.createBaselineFolder(
				PathHelper.getBaselineFolder(this.scenario.imagesToAnalyze[0]),
			) === false
		) {
			//log error
			return false;
		}

		if (
			folderController.recreateOutputAndActualStatusFolders(
				PathHelper.getOutputFolder(this.scenario.imagesToAnalyze[0]),
				PathHelper.getActualStatusFolder(
					this.scenario.imagesToAnalyze[0],
				),
			) === false
		) {
			//log error
			return false;
		}

		return true;
	}

	async runner(): Promise<void> {
		let imagesToAnalyzeCounter = 0;
		for (let i = 0; i < this.scenario.steps.length; i++) {
			// this.scenario.steps[i]; 1 step
			for (const substep of this.scenario.steps[i]) {
				await this.puppeteer.goto(substep);
			}

			if (
				//baseline exsists
				FileSystem.checkAvailability(
					this.scenario.imagesToAnalyze[imagesToAnalyzeCounter],
				)
			) {
				const actualStatusPath = PathHelper.getActualStatusImage(
					this.scenario.imagesToAnalyze[imagesToAnalyzeCounter],
				);
				await this.puppeteer.screenshot(actualStatusPath);
				const result = await this.compareImages(
					this.scenario.imagesToAnalyze[imagesToAnalyzeCounter],
					actualStatusPath,
				);

				//save output file
				FileSystem.writeFile(
					PathHelper.getOutputImage(
						this.scenario.imagesToAnalyze[imagesToAnalyzeCounter],
					),
					result.resultBuffer,
				);

				//log results
			} else {
				//baseline not exists yet
				await this.puppeteer.screenshot(
					this.scenario.imagesToAnalyze[imagesToAnalyzeCounter],
				);
				//create baseline
			}
			imagesToAnalyzeCounter++;
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
		const loadedImages = this.loadImagesForComparisment(
			pathToOriginalImage,
			pathToComaredImage,
		);

		if (loadedImages.status === 'ok') {
		} else {
			return {
				rawMisMatchPercentage: 0,
				misMatchPercentage: '0.00',
				resultBuffer: Buffer.from(''),
			};
		}

		const imagesComparer = new ImagesComparer();

		const result = await imagesComparer.compareImages(
			loadedImages.originalImageBuffer,
			loadedImages.comparedImageBuffer,
		);

		return result;
	}

	loadImagesForComparisment(
		pathToOriginalImage: string,
		pathToComaredImage: string,
	): {
		status: string;
		originalImageBuffer: Buffer;
		comparedImageBuffer: Buffer;
	} {
		const originalImage = FileSystem.readFile(pathToOriginalImage);
		if (originalImage.status == false) {
			return this.returnEmptyComparisment(
				`Issue with file ->${pathToOriginalImage}<-`, //fix me: use this message
			);
		}

		const comparedImage = FileSystem.readFile(pathToComaredImage);
		if (comparedImage.status == false) {
			return this.returnEmptyComparisment(
				`Issue with file ->${pathToComaredImage}<-`, //fix me: use this message
			);
		}

		return {
			status: 'ok',
			originalImageBuffer: originalImage.fileContent,
			comparedImageBuffer: comparedImage.fileContent,
		};
	}

	returnEmptyComparisment(
		info: string,
	): {
		status: string;
		originalImageBuffer: Buffer;
		comparedImageBuffer: Buffer;
	} {
		return {
			status: info,
			originalImageBuffer: Buffer.from(''),
			comparedImageBuffer: Buffer.from(''),
		};
	}
}

export default ScenarioRunner;

import Scenario from './Scenario';
import FolderController from './FolderController';
import Puppeteer from './VRTPuppeteer';
import ImagesComparer from './ImagesComparer';
import FileSystem from './FileSystem';
import PathHelper from './Helpers/PathHelper';
import VRTPuppeteer from './VRTPuppeteer';
import globalSettings from '../GlobalSettings';
import Logger from './Logger';
import scenarioRunnerLocalization from './localization/ScenarioRunnerLocalization';

class ScenarioRunner {
	scenario: Scenario;
	pathToScenario: string;
	puppeteer: Puppeteer;
	logger: Logger;

	constructor(pathToScenario: string) {
		this.logger = new Logger();
		this.logger.info(
			`${scenarioRunnerLocalization.startingScenarioRunner} ${pathToScenario}`,
		);
		this.scenario = new Scenario();
		this.pathToScenario = pathToScenario;
		this.puppeteer = new VRTPuppeteer(globalSettings.puppeteerConfigPath);
	}

	async loadScenarios(): Promise<boolean> {
		this.logger.debug(
			`${scenarioRunnerLocalization.loadingScenario} ${this.pathToScenario}`,
		);
		if (
			this.scenario.checkScenarioAvailability(this.pathToScenario) ===
			false
		) {
			this.logger.error(
				`${scenarioRunnerLocalization.scenarioNotAvailable} ${this.pathToScenario}`,
			);
			return false;
		}

		await this.scenario.loadScenario(this.pathToScenario);

		if (this.scenario.isScenarioParsedSuccessfully() === false) {
			this.logger.error(
				`${scenarioRunnerLocalization.failedLoadingScenario} ${this.pathToScenario}`,
			);
			return false;
		}

		this.logger.debug(scenarioRunnerLocalization.loadingSuccessful);
		return true;
	}

	async runScenarios(): Promise<boolean> {
		this.logger.info(
			`${scenarioRunnerLocalization.runningScenario} ${this.pathToScenario}`,
		);

		if (this.createFolders() === false) {
			this.logger.error(
				`${scenarioRunnerLocalization.creatingFoldersFail}`,
			);
			return false;
		}

		this.logger.debug(scenarioRunnerLocalization.openingPuppeteer);

		await this.puppeteer.start();

		this.logger.debug(scenarioRunnerLocalization.runningStepsInPuppeteer);

		await this.runner();

		this.logger.debug(scenarioRunnerLocalization.closingPuppeteer);

		await this.puppeteer.closeBrowser();

		this.logger.debug(scenarioRunnerLocalization.scenarioFinished);

		return true;
	}

	createFolders(): boolean {
		if (this.scenario.imagesToAnalyze.length === 0) {
			this.logger.warning(
				scenarioRunnerLocalization.createFoldersNoImagesToAnalyze,
			);
			return false;
		}

		this.scenario.imagesToAnalyze.forEach((imageToAnalyze) => {
			const pathToBaselineFolder = PathHelper.getBaselineFolder(
				imageToAnalyze,
			);

			const statusOfCreatingBaselineFolder = FolderController.createBaselineFolder(
				pathToBaselineFolder,
			);

			if (statusOfCreatingBaselineFolder === false) {
				this.logger.error(
					`${scenarioRunnerLocalization.creatingBaselineFolderNotPossible} ${pathToBaselineFolder}`,
				);
				return false;
			}

			const pathToOutputFolder = PathHelper.getOutputFolder(
				imageToAnalyze,
			);

			const pathToActualStatusFolder = PathHelper.getActualStatusFolder(
				imageToAnalyze,
			);

			const statusOfCreatingOutputAndActualStatusFolders = FolderController.recreateOutputAndActualStatusFolders(
				pathToOutputFolder,
				pathToActualStatusFolder,
			);

			if (statusOfCreatingOutputAndActualStatusFolders === false) {
				this.logger.error(
					`${scenarioRunnerLocalization.recreatingOutputAndActualStatusFolderNotPossible} ${pathToOutputFolder} ${pathToActualStatusFolder}`,
				);
				return false;
			}
		});

		this.logger.debug(scenarioRunnerLocalization.creatingFoldersSuccessful);

		return true;
	}

	async runner(): Promise<void> {
		let imagesToAnalyzeCounter = 0;
		for (let i = 0; i < this.scenario.steps.length; i++) {
			this.logger.debug(
				`${scenarioRunnerLocalization.analyzingStep} ${this.scenario.steps[i]}`,
			);

			// this.scenario.steps[i]; one step
			for (const substep of this.scenario.steps[i]) {
				this.logger.debug(
					`${scenarioRunnerLocalization.puppeteerVisitsPage} ${substep}`,
				);

				await this.puppeteer.goto(substep);
			}

			this.logger.debug(
				`${scenarioRunnerLocalization.checkingIfBaselineExists} ${this.scenario.imagesToAnalyze[imagesToAnalyzeCounter]}`,
			);

			if (
				//baseline exsists
				FileSystem.checkAvailability(
					this.scenario.imagesToAnalyze[imagesToAnalyzeCounter],
				)
			) {
				this.logger.info(
					`${scenarioRunnerLocalization.baselineExists}`,
				);

				this.logger.debug(
					scenarioRunnerLocalization.gettingPathToActualStatusImage,
				);

				const actualStatusPath = PathHelper.getActualStatusImage(
					this.scenario.imagesToAnalyze[imagesToAnalyzeCounter],
				);

				this.logger.debug(
					scenarioRunnerLocalization.takingScreenshotForActualStatusImage,
				);

				await this.puppeteer.screenshot(actualStatusPath);

				this.logger.debug(
					scenarioRunnerLocalization.comparingActualStatusImageWithBaseline,
				);

				const result = await this.compareImages(
					this.scenario.imagesToAnalyze[imagesToAnalyzeCounter],
					actualStatusPath,
				);

				const pathToOutputImage = PathHelper.getOutputImage(
					this.scenario.imagesToAnalyze[imagesToAnalyzeCounter],
				);

				this.logger.debug(
					`${scenarioRunnerLocalization.savingOutputImage} ${pathToOutputImage}`,
				);

				//save output file
				FileSystem.writeFile(pathToOutputImage, result.resultBuffer);

				if (globalSettings.usingMismatchPrecentage) {
					this.logger.info(
						`${scenarioRunnerLocalization.mismatchPercentageWas} ${result.misMatchPercentage}`,
					);
				} else {
					this.logger.info(
						`${scenarioRunnerLocalization.rawMismatchPercentageWas} ${result.rawMisMatchPercentage}`,
					);
				}
			} else {
				//baseline not exists yet
				this.logger.info(
					scenarioRunnerLocalization.baselineDoesNotExists,
				);

				this.logger.info(
					`${scenarioRunnerLocalization.takingScreenshotForBaseline} ${this.scenario.imagesToAnalyze[imagesToAnalyzeCounter]}`,
				);

				//create baseline
				await this.puppeteer.screenshot(
					this.scenario.imagesToAnalyze[imagesToAnalyzeCounter],
				);
			}
			this.logger.debug(
				scenarioRunnerLocalization.gettingNextImageToAnalyze,
			);
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
		this.logger.debug(
			scenarioRunnerLocalization.loadingImagesForComparisment,
		);

		const loadedImages = this.loadImagesForComparisment(
			pathToOriginalImage,
			pathToComaredImage,
		);

		if (loadedImages.status === 'ok') {
			this.logger.debug(
				scenarioRunnerLocalization.imagesForComparismentLoadedSuccessfully,
			);
		} else {
			this.logger.debug(
				scenarioRunnerLocalization.loadingImagesForComparismentFailed,
			);
			return {
				rawMisMatchPercentage: 0,
				misMatchPercentage: '0.00',
				resultBuffer: Buffer.from(''),
			};
		}

		const imagesComparer = new ImagesComparer();

		this.logger.debug(scenarioRunnerLocalization.comparingImages);

		const result = await imagesComparer.compareImages(
			loadedImages.originalImageBuffer,
			loadedImages.comparedImageBuffer,
		);

		this.logger.debug(
			scenarioRunnerLocalization.returningResultAfterComparisment,
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
		this.logger.debug(
			scenarioRunnerLocalization.startingLoadingImagesForComparisment,
		);

		this.logger.debug(scenarioRunnerLocalization.loadingOriginalImage);
		const originalImage = FileSystem.readFile(pathToOriginalImage);

		if (originalImage.status == false) {
			this.logger.debug(
				scenarioRunnerLocalization.loadingOriginalImageFailed,
			);

			this.logger.error(
				`${scenarioRunnerLocalization.issueWithOriginalImage} ${pathToComaredImage}`,
			);

			return this.returnEmptyComparisment();
		}

		this.logger.debug(scenarioRunnerLocalization.loadingComparedImage);

		const comparedImage = FileSystem.readFile(pathToComaredImage);
		if (comparedImage.status == false) {
			this.logger.debug(
				scenarioRunnerLocalization.loadingComparedImageFailed,
			);

			this.logger.error(
				`${scenarioRunnerLocalization.issueWithOriginalImage} ${pathToComaredImage}`,
			);

			return this.returnEmptyComparisment();
		}

		return {
			status: 'ok',
			originalImageBuffer: originalImage.fileContent,
			comparedImageBuffer: comparedImage.fileContent,
		};
	}

	returnEmptyComparisment(): {
		status: string;
		originalImageBuffer: Buffer;
		comparedImageBuffer: Buffer;
	} {
		return {
			status: `error`,
			originalImageBuffer: Buffer.from(''),
			comparedImageBuffer: Buffer.from(''),
		};
	}
}

export default ScenarioRunner;

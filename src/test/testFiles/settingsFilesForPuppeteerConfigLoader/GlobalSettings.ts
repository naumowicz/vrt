class GlobalSettings {
	tasks: string;
	enableConsoleLogger: boolean;
	puppeteerConfigPath: string;
	resembleConfigPath: string;
	actualStatusFolderName: string;
	outputFolderName: string;
	numberOfThreads: number;

	constructor() {
		this.tasks = './tasks.json';
		this.enableConsoleLogger = true;
		this.puppeteerConfigPath =
			'./src/test/testFiles/settingsFilesForPuppeteerConfigLoader/PuppeteerConfig.json';
		this.resembleConfigPath =
			'./src/test/testFiles/settingsFilesForPuppeteerConfigLoader/ResembleConfig.json';
		this.actualStatusFolderName = 'actualStatus';
		this.outputFolderName = 'output';
		this.numberOfThreads = 1;
	}
}

export default new GlobalSettings();
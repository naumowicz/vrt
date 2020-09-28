class GlobalSettings {
	tasks: string;
	enableConsoleLogger: boolean;
	puppeteerConfigPath: string;
	resembleConfigPath: string;
	actualStatusFolderName: string;
	outputFolderName: string;
	numberOfThreads: number;
	errorPrefix: string;
	warningPrefix: string;
	infoPrefix: string;
	debugPrefix: string;

	constructor() {
		this.tasks = './tasks.json';
		this.enableConsoleLogger = true;
		this.puppeteerConfigPath = './PuppeteerConfig.json';
		this.resembleConfigPath = './ResembleConfig.json';
		this.actualStatusFolderName = 'actualStatus';
		this.outputFolderName = 'output';
		this.numberOfThreads = 1;
		this.errorPrefix = 'Error: ';
		this.warningPrefix = 'Warning: ';
		this.infoPrefix = 'Info: ';
		this.debugPrefix = 'Debug: ';
	}
}

export default new GlobalSettings();

class GlobalSettings {
	tasks: string;
	enableConsoleLogger: boolean;
	puppeteerConfigPath: string;
	resembleConfigPath: string;
	actualStatusFolderName: string;

	constructor() {
		this.tasks = './tasks.json';
		this.enableConsoleLogger = true;
		this.puppeteerConfigPath = './PuppeteerConfig.json';
		this.resembleConfigPath = './ResembleConfig.json';
		this.actualStatusFolderName = 'actualStatus';
	}
}

export default new GlobalSettings();

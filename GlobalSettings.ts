class GlobalSettings {
	tasks: string;
	enableConsoleLogger: boolean;
	puppeteerConfigPath: string;
	resembleConfigPath: string;

	constructor() {
		this.tasks = './tasks.json';
		this.enableConsoleLogger = true;
		this.puppeteerConfigPath = './PuppeteerConfig.json';
		this.resembleConfigPath = './ResembleConfig.json';
	}
}

export default new GlobalSettings();

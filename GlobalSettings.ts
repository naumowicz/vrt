import colors from './src/settings/ConsoleOutputColors';

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
	errorColor: string;
	warningColor: string;
	infoColor: string;
	debugColor: string;

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
		this.errorColor = colors.FgRed;
		this.warningColor = colors.FgYellow;
		this.infoColor = colors.FgWhite;
		this.debugColor = colors.FgGreen;
	}
}

export default new GlobalSettings();

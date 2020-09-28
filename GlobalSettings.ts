import colors from './src/settings/ConsoleOutputColors';

class GlobalSettings {
	tasks: string;
	enableConsoleLogger: boolean;
	puppeteerConfigPath: string;
	resembleConfigPath: string;
	actualStatusFolderName: string;
	outputFolderName: string;
	numberOfThreads: number;
	loggingPrefixes: {
		errorPrefix: string;
		warningPrefix: string;
		infoPrefix: string;
		debugPrefix: string;
	};
	consoleLoggerColors: {
		errorColor: string;
		warningColor: string;
		infoColor: string;
		debugColor: string;
	};

	constructor() {
		this.tasks = './tasks.json';
		this.enableConsoleLogger = true;
		this.puppeteerConfigPath = './PuppeteerConfig.json';
		this.resembleConfigPath = './ResembleConfig.json';
		this.actualStatusFolderName = 'actualStatus';
		this.outputFolderName = 'output';
		this.numberOfThreads = 1;
		this.loggingPrefixes = {
			errorPrefix: 'Error: ',
			warningPrefix: 'Warning: ',
			infoPrefix: 'Info: ',
			debugPrefix: 'Debug: ',
		};
		this.consoleLoggerColors = {
			errorColor: colors.FgRed,
			warningColor: colors.FgYellow,
			infoColor: colors.FgWhite,
			debugColor: colors.FgGreen,
		};
	}
}

export default new GlobalSettings();

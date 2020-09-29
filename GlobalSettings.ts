import colors from './src/settings/ConsoleOutputColors';

const globalSettings = {
	tasks: './tasks.json',
	enableConsoleLogger: true,
	puppeteerConfigPath: './PuppeteerConfig.json',
	resembleConfigPath: './ResembleConfig.json',
	actualStatusFolderName: 'actualStatus',
	outputFolderName: 'output',
	numberOfThreads: 1,
	loggingPrefixes: {
		errorPrefix: 'Error: ',
		warningPrefix: 'Warning: ',
		infoPrefix: 'Info: ',
		debugPrefix: 'Debug: ',
	},
	consoleLoggerColors: {
		errorColor: colors.FgRed,
		warningColor: colors.FgYellow,
		infoColor: colors.FgWhite,
		debugColor: colors.FgGreen,
	},
	usingMismatchPrecentage: true,
	debugging: false,
};

export default globalSettings;

import ConsoleLogger from './ConsoleLogger';
import LocalLog from './LocalLog';
import globalSettings from '../GlobalSettings';

class Logger {
	consoleLogger: ConsoleLogger;
	consoleOutput: boolean;
	localLog: LocalLog;
	// errorName: string;
	// warningName: string;
	// infoName: string;
	listOfLocalLogFiles: Array<string>;

	constructor() {
		if (globalSettings.enableConsoleLogger) {
			this.consoleLogger = new ConsoleLogger();
			this.consoleOutput = true;
		} else {
			this.consoleOutput = false;
		}

		this.localLog = new LocalLog(
			globalSettings.errorPrefix,
			globalSettings.warningPrefix,
			globalSettings.infoPrefix,
			globalSettings.debugPrefix,
		);
	}

	setColorsForConsoleLogger(
		errorColor: string,
		warningColor: string,
		infoColor: string,
	): void {
		this.consoleLogger.setColors(errorColor, warningColor, infoColor);
	}

	// setLogsTypeName(
	// 	errorName: string,
	// 	warningName: string,
	// 	infoName: string,
	// ): void {
	// 	this.errorName = errorName;
	// 	this.warningName = warningName;
	// 	this.infoName = infoName;
	// }

	error(data: string): void {
		if (this.consoleOutput) {
			this.consoleLogger.error(data);
		}

		this.localLog.error(data);
	}

	warning(data: string): void {
		if (this.consoleOutput) {
			this.consoleLogger.warning(data);
		}

		this.localLog.info(data);
	}

	info(data: string): void {
		if (this.consoleOutput) {
			this.consoleLogger.info(data);
		}

		this.localLog.info(data);
	}
}

export default Logger;

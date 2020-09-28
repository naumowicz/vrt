import ConsoleLogger from './ConsoleLogger';
import LocalLog from './LocalLog';
import globalSettings from '../GlobalSettings';

class Logger {
	consoleLogger: ConsoleLogger;
	localLog: LocalLog;
	// errorName: string;
	// warningName: string;
	// infoName: string;
	listOfLocalLogFiles: Array<string>;

	constructor() {
		if (globalSettings.enableConsoleLogger) {
			this.consoleLogger = new ConsoleLogger();
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
		debugColor: string,
	): void {
		if (globalSettings.enableConsoleLogger) {
			this.consoleLogger.setColors(
				errorColor,
				warningColor,
				infoColor,
				debugColor,
			);
		}
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
		if (globalSettings.enableConsoleLogger) {
			this.consoleLogger.error(data);
		}

		this.localLog.error(data);
	}

	warning(data: string): void {
		if (globalSettings.enableConsoleLogger) {
			this.consoleLogger.warning(data);
		}

		this.localLog.info(data);
	}

	info(data: string): void {
		if (globalSettings.enableConsoleLogger) {
			this.consoleLogger.info(data);
		}

		this.localLog.info(data);
	}

	debug(data: string): void {
		if (globalSettings.enableConsoleLogger) {
			this.consoleLogger.info(data);
		}
	}
}

export default Logger;

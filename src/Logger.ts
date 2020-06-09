import ConsoleLogger from './ConsoleLogger';
import LocalLog from './LocalLog';

class Logger {
	consoleLogger: ConsoleLogger;
	consoleOutput: boolean;
	localLog: LocalLog;
	errorName: string;
	warningName: string;
	infoName: string;
	listOfLocalLogFiles: Array<string>;

	constructor(consoleOutput: boolean) {
		this.consoleOutput = consoleOutput;
		if (consoleOutput) {
			this.consoleLogger = new ConsoleLogger();
		}
	}

	setColorsForConsoleLogger(
		errorColor: string,
		warningColor: string,
		infoColor: string,
	): void {
		this.consoleLogger.setColors(errorColor, warningColor, infoColor);
	}

	setLogsTypeName(
		errorName: string,
		warningName: string,
		infoName: string,
	): void {
		this.errorName = errorName;
		this.warningName = warningName;
		this.infoName = infoName;
	}

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

import ConsoleLogger from './ConsoleLogger';
import LocalLog from './LocalLog';
import { parentPort } from 'worker_threads';
import globalSettings from '../GlobalSettings';

class Logger {
	consoleLogger: ConsoleLogger;
	consoleOutput: boolean;
	localLog: LocalLog;
	errorName: string;
	warningName: string;
	infoName: string;
	listOfLocalLogFiles: Array<string>;

	constructor() {
		if (globalSettings.enableConsoleLogger) {
			this.consoleLogger = new ConsoleLogger();
		} else {
			this.consoleOutput = false;
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

const logger = new Logger();

parentPort.on('message', (log: { type: string; message: string }) => {
	switch (log.type) {
		case 'error':
			logger.error(log.message);
			break;
		case 'warning':
			logger.warning(log.message);
			break;
		case 'info':
			logger.info(log.message);
			break;
		default:
			break;
	}
});

exports.module = Logger;

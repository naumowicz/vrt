import colors from './settings/ConsoleOutputColors';

class ConsoleLogger {
	errorColor: string;
	warningColor: string;
	infoColor: string;
	debugColor: string;

	constructor(
		errorColor = colors.FgRed,
		warningColor = colors.FgYellow,
		infoColor = colors.FgWhite,
		debugColor = colors.FgGreen,
	) {
		this.errorColor = errorColor;
		this.warningColor = warningColor;
		this.infoColor = infoColor;
		this.debugColor = debugColor;
		// this.setColors(errorColor, warningColor, infoColor, debugColor);
	}

	// setColors(
	// 	errorColor: string,
	// 	warningColor: string,
	// 	infoColor: string,
	// 	debugColor: string,
	// ): void {
	// 	this.errorColor = errorColor;
	// 	this.warningColor = warningColor;
	// 	this.infoColor = infoColor;
	// 	this.debugColor = debugColor;
	// }

	error(data: string): void {
		console.log(`${this.errorColor}${data}${colors.Reset}`);
	}

	warning(data: string): void {
		console.log(`${this.warningColor}${data}${colors.Reset}`);
	}

	info(data: string): void {
		console.log(`${this.infoColor}${data}${colors.Reset}`);
	}

	debug(data: string): void {
		console.log(`${this.debugColor}${data}${colors.Reset}`);
	}
}

export default ConsoleLogger;

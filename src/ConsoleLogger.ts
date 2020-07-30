import colors from './settings/ConsoleOutputColors';

class ConsoleLogger {
	errorColor: string;
	warningColor: string;
	infoColor: string;

	constructor(
		errorColor = colors.FgRed,
		warningColor = colors.FgYellow,
		infoColor = colors.FgWhite,
	) {
		this.setColors(errorColor, warningColor, infoColor);
	}

	setColors(
		errorColor: string,
		warningColor: string,
		infoColor: string,
	): void {
		this.errorColor = errorColor;
		this.warningColor = warningColor;
		this.infoColor = infoColor;
	}

	error(data: string): void {
		console.log(`${this.errorColor}${data}${colors.Reset}`);
	}

	warning(data: string): void {
		console.log(`${this.warningColor}${data}${colors.Reset}`);
	}

	info(data: string): void {
		console.log(`${this.infoColor}${data}${colors.Reset}`);
	}
}

export default ConsoleLogger;

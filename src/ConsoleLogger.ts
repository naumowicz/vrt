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
		console.log(`${this.errorColor}${colors.Reset}`, data);
	}

	warning(data: string): void {
		console.log(`${this.warningColor}${colors.Reset}`, data);
	}

	info(data: string): void {
		console.log(`${this.infoColor}${colors.Reset}`, data);
	}
}

export default ConsoleLogger;

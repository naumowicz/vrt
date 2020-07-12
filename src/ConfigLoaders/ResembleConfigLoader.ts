import FileSystem from '../FileSystem';

interface ResembleConfig {
	red: number;
	green: number;
	blue: number;
	errorType: string;
	transparency: number;
	ignore: string;
}

class ResembleConfigLoader {
	resembleConfig: ResembleConfig;

	constructor(pathToResebleConfig: string) {
		const rawFile = FileSystem.readFile(pathToResebleConfig);

		if (rawFile.status) {
			this.resembleConfig = JSON.parse(rawFile.fileContent.toString());
		} else {
			this.resembleConfig.red = 255;
			this.resembleConfig.green = 0;
			this.resembleConfig.blue = 255;
			this.resembleConfig.errorType = 'movement';
			this.resembleConfig.transparency = 0.3;
			this.resembleConfig.ignore = 'antialiasing';
		}
	}

	getColors(): { red: number; green: number; blue: number } {
		return {
			red: this.resembleConfig.red,
			green: this.resembleConfig.green,
			blue: this.resembleConfig.blue,
		};
	}

	getErrorType(): string {
		return this.resembleConfig.errorType;
	}

	getTransparency(): number {
		return this.resembleConfig.transparency;
	}

	getIgnore(): string {
		return this.resembleConfig.ignore;
	}
}

export default ResembleConfigLoader;

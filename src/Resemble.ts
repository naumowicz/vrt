// eslint-disable-next-line @typescript-eslint/no-var-requires
const compareImages = require('resemblejs/compareImages');
import ResembleConfig from './ConfigLoaders/ResembleConfigLoader';

interface Box {
	left: number;
	top: number;
	right: number;
	bottom: number;
}

class Resemble {
	errorColorRed: number;
	errorColorGreen: number;
	errorColorBlue: number;
	errorType: string;
	transparency: number;
	useCrossOrigin: false;
	largeImageThreshold: number;
	outputDiff: true;
	ignoredBoxes: Array<Box>;
	boundingBoxes: Array<Box>;
	scaleToSameSize: true;
	ignore: string;
	resembleConfig: ResembleConfig;

	constructor(pathToResembleGlobalSettingsFile: string) {
		this.resembleConfig = new ResembleConfig(
			pathToResembleGlobalSettingsFile,
		);

		const colors = this.resembleConfig.getColors();
		this.setErrorOutputColor(colors.red, colors.green, colors.blue);

		//fixme: possible entries
		this.errorType = this.resembleConfig.getErrorType();
		//fixme: possible entries
		this.transparency = this.resembleConfig.getTransparency();
		//fixme: possible entries
		this.ignore = this.resembleConfig.getIgnore();

		this.setTransparency(this.resembleConfig.getTransparency());
	}

	public setErrorOutputColor(red: number, green: number, blue: number): void {
		if (
			red >= 0 &&
			red <= 255 &&
			green >= 0 &&
			green <= 255 &&
			blue >= 0 &&
			blue <= 255
		) {
			this.errorColorRed = red;
			this.errorColorGreen = green;
			this.errorColorBlue = blue;
		} else {
			this.errorColorRed = 255;
			this.errorColorGreen = 0;
			this.errorColorBlue = 255;
		}
	}

	public getErrorColor(): { red: number; green: number; blue: number } {
		return {
			red: this.errorColorRed,
			green: this.errorColorGreen,
			blue: this.errorColorBlue,
		};
	}

	public setTransparency(transparencyLevel: number): void {
		if (transparencyLevel >= 0 && transparencyLevel <= 1) {
			this.transparency = transparencyLevel;
		} else {
			this.transparency = 0.3;
		}
	}

	public getTransparencyLevel(): number {
		return this.transparency;
	}

	public async getDiff(
		pathToOriginalImage: Buffer,
		pathToComparedImage: Buffer,
	): Promise<{
		isSameDimensions: boolean;
		dimensionDifference: { width: number; height: number };
		rawMisMatchPercentage: number;
		misMatchPercentage: string;
		diffBounds: {
			top: number;
			left: number;
			bottom: number;
			right: number;
		};
		analysisTime: number;
		getImageDataUrl: Function;
		getBuffer: Function;
	}> {
		const data = await compareImages(
			pathToOriginalImage,
			pathToComparedImage,
			this.getResembleOptions(),
		);

		return data;
	}

	getResembleOptions(): {
		output: {
			errorColor: {
				red: number;
				green: number;
				blue: number;
			};
			errorType: string;
			transparency: number;
			largeImageThreshold: number;
			useCrossOrigin: false;
			outputDiff: true;
			ignoredBoxes: Array<Box>;
			boundingBoxes: Array<Box>;
		};
		scaleToSameSize: true;
		ignore: string;
	} {
		return {
			output: {
				errorColor: {
					red: this.errorColorRed,
					green: this.errorColorGreen,
					blue: this.errorColorBlue,
				},
				errorType: this.errorType,
				transparency: this.transparency,
				largeImageThreshold: this.largeImageThreshold,
				useCrossOrigin: this.useCrossOrigin,
				outputDiff: this.outputDiff,
				ignoredBoxes: this.ignoredBoxes,
				boundingBoxes: this.boundingBoxes,
			},
			scaleToSameSize: this.scaleToSameSize,
			ignore: this.ignore,
		};
	}
}

export default Resemble;

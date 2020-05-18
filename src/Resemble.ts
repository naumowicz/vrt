// eslint-disable-next-line @typescript-eslint/no-var-requires
const compareImages = require('resemblejs/compareImages');

class Resemble {
	private options = {
		output: {
			errorColor: {
				red: 255,
				green: 0,
				blue: 255,
			},
			errorType: 'movement',
			transparency: 0.3,
			largeImageThreshold: 0,
			useCrossOrigin: false,
			outputDiff: true,
			ignoredBoxes: [],
			boundingBoxes: [],
		},
		scaleToSameSize: true,
		ignore: 'antialiasing',
	};

	public setErrorOutputColor(red: number, green: number, blue: number): void {
		if (
			red >= 0 &&
			red <= 255 &&
			green >= 0 &&
			green <= 255 &&
			blue >= 0 &&
			blue <= 255
		) {
			this.options.output.errorColor = {
				red: red,
				green: green,
				blue: blue,
			};
		}
	}

	public getErrorColor(): { red: number; green: number; blue: number } {
		return this.options.output.errorColor;
	}

	public setTransparency(transparencyLevel: number): void {
		if (transparencyLevel >= 0 && transparencyLevel <= 1) {
			this.options.output.transparency = transparencyLevel;
		}
	}

	public getTransparencyLevel(): number {
		return this.options.output.transparency;
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
			this.options,
		);

		return data;
	}
}

export default Resemble;

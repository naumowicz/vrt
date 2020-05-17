const compareImages = require('resemblejs/compareImages');
import * as fs from 'fs';

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

	getErrorColor(): { red: number; green: number; blue: number } {
		return this.options.output.errorColor;
	}

	public setTransparency(transparencyLevel: number): void {
		if (transparencyLevel >= 0 && transparencyLevel <= 1) {
			this.options.output.transparency = transparencyLevel;
		}
	}

	getTransparencyLevel(): number {
		return this.options.output.transparency;
	}

	public async getDiff(
		pathToOriginalImage: string,
		pathToComparedImage: string,
	): Promise<boolean> {
		// The parameters can be Node Buffers
		// data is the same as usual with an additional getBuffer() function
		const data = await compareImages(
			fs.readFile(pathToOriginalImage, (err) => {
				if (err) throw err;
			}),
			fs.readFile(pathToComparedImage, (err) => {
				if (err) throw err;
			}),
			this.options,
		);

		fs.writeFile('./output.png', data.getBuffer(), (err) => {
			if (err) throw err;
		});

		return true;
	}
}

export default Resemble;

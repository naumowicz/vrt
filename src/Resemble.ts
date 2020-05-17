const compareImages = require('resemblejs/compareImages');
import fs from 'fs';

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

	public setErrorOutputColor(red: number, green: number, blue: number) {
		this.options.output.errorColor = { red: red, green: green, blue: blue };
	}

	public setTransparency(level: number) {
		this.options.output.transparency = level;
	}

	public async getDiff() {
		// The parameters can be Node Buffers
		// data is the same as usual with an additional getBuffer() function
		const data = await compareImages(
			await fs.readFile('./your-image-path/People.jpg'),
			await fs.readFile('./your-image-path/People2.jpg'),
			this.options,
		);

		await fs.writeFile('./output.png', data.getBuffer());
	}
}

module.exports = Resemble;

import Resemble from './Resemble';
import globalSettings from '../GlobalSettings';
import Path from './Path';

class ImagesComparer {
	async compareImages(
		originalImage: Buffer,
		imageToCompare: Buffer,
	): Promise<{
		rawMisMatchPercentage: number;
		misMatchPercentage: string;
		resultBuffer: Buffer;
	}> {
		const resemble = new Resemble(
			Path.resolvePath(globalSettings.resembleConfigPath),
		);
		const result = await resemble.getDiff(originalImage, imageToCompare);

		return {
			rawMisMatchPercentage: result.rawMisMatchPercentage,
			misMatchPercentage: result.misMatchPercentage,
			resultBuffer: result.getBuffer(),
		};
	}
}

export default ImagesComparer;

import Resemble from './Resemble';
import globalSettings from '../GlobalSettings';

class ImagesComparer {
	async compareImages(
		originalImage: Buffer,
		imageToCompare: Buffer,
	): Promise<{
		rawMisMatchPercentage: number;
		misMatchPercentage: string;
		buffer: Buffer;
	}> {
		const resemble = new Resemble(globalSettings.resembleConfigPath);
		const result = await resemble.getDiff(originalImage, imageToCompare);
		const rawMisMatchPercentage = result.rawMisMatchPercentage;
		const misMatchPercentage = result.misMatchPercentage;
		const buffer = result.getBuffer();

		return { rawMisMatchPercentage, misMatchPercentage, buffer };
	}
}

export default ImagesComparer;

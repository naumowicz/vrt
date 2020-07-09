import Resemble from './Resemble';

class ImagesComparer {
	async compareImages(
		originalImage: Buffer,
		imageToCompare: Buffer,
	): Promise<{
		rawMisMatchPercentage: number;
		misMatchPercentage: string;
		getBuffer: Function;
	}> {
		const resemble = new Resemble();
		const result = await resemble.getDiff(originalImage, imageToCompare);
		const rawMisMatchPercentage = result.rawMisMatchPercentage;
		const misMatchPercentage = result.misMatchPercentage;
		const getBuffer = result.getBuffer;

		return { rawMisMatchPercentage, misMatchPercentage, getBuffer };
	}
}

export default ImagesComparer;

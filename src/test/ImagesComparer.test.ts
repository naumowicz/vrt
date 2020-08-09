import ImagesComparer from '../ImagesComparer';
import FileSystem from '../FileSystem';
import Path from '../Path';

describe('Testing ImagesComparer', () => {
	test('Comparing two identical images', async () => {
		const imagesComparer = new ImagesComparer();

		const imagePath = './src/test/testimage1.png';

		const image = FileSystem.readFile(Path.resolvePath(imagePath));

		const result = await imagesComparer.compareImages(
			image.fileContent,
			image.fileContent,
		);

		expect(result.rawMisMatchPercentage).toEqual(0);
		expect(result.misMatchPercentage).toEqual('0.00');

		const expectedImagePath = './src/test/buffer_test_images_equal.png';

		const expectedImage = FileSystem.readFile(
			Path.resolvePath(expectedImagePath),
		);

		expect(result.resultBuffer).toEqual(expectedImage.fileContent);
	});
	test('Comparing two different images', async () => {
		const imagesComparer = new ImagesComparer();

		const image1Path = './src/test/testimage1.png';
		const image1 = FileSystem.readFile(Path.resolvePath(image1Path));
		const image2Path = './src/test/testimage2.png';
		const image2 = FileSystem.readFile(Path.resolvePath(image2Path));

		const result = await imagesComparer.compareImages(
			image1.fileContent,
			image2.fileContent,
		);

		expect(result.rawMisMatchPercentage).toEqual(3.057407708570499);
		expect(result.misMatchPercentage).toEqual('3.06');

		const expectedImagePath = './src/test/test_images_not_equal.png';

		const expectedImage = FileSystem.readFile(
			Path.resolvePath(expectedImagePath),
		);

		expect(result.resultBuffer.equals(expectedImage.fileContent)).toEqual(
			true,
		);
	});
});

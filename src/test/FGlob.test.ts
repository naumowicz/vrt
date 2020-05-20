import FGlob from '../FGlob';

describe('Test for glob features', () => {
	test('Receive only test1.txt', async () => {
		const fglob = new FGlob('./src/test/fglobTest', '*.txt');

		const paths = await fglob.getPathsToFiles();

		expect(paths[0]).toEqual('./src/test/fglobTest/test1.txt');
	});

	test('Receive all (2) test files from fglobTest', async () => {
		const fglob = new FGlob('./src/test/fglobTest', 'test*');

		const paths = await fglob.getPathsToFiles();

		expect(paths).toEqual([
			'./src/test/fglobTest/test1.txt',
			'./src/test/fglobTest/test2.ini',
		]);
	});

	test('Receive all fast-glob test files', async () => {
		const fglob = new FGlob('./src/test/fglobTest', '**/*.txt');

		const paths = await fglob.getPathsToFiles();

		expect(paths).toEqual([
			'./src/test/fglobTest/test1.txt',
			'./src/test/fglobTest/innerFolder/test1.txt',
			'./src/test/fglobTest/innerFolder/test2.txt',
		]);
	});
});

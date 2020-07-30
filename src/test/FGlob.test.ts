import FGlob from '../FGlob';

describe('Test for glob features', () => {
	test('Receive only test1.txt', async () => {
		const fglob = new FGlob();

		const paths = await fglob.getPathsToFiles(
			'./src/test/fglobTest',
			'*.txt',
		);

		expect(paths[0]).toEqual('./src/test/fglobTest/test1.txt');
	});

	test('Receive all (2) test files from fglobTest', async () => {
		const fglob = new FGlob();

		const paths = await fglob.getPathsToFiles(
			'./src/test/fglobTest',
			'test*',
		);

		expect(paths).toEqual([
			'./src/test/fglobTest/test1.txt',
			'./src/test/fglobTest/test2.ini',
		]);
	});

	test('Receive all fast-glob test files', async () => {
		const fglob = new FGlob();

		const paths = await fglob.getPathsToFiles(
			'./src/test/fglobTest',
			'**/*.txt',
		);

		expect(paths).toEqual([
			'./src/test/fglobTest/test1.txt',
			'./src/test/fglobTest/innerFolder/test1.txt',
			'./src/test/fglobTest/innerFolder/test2.txt',
		]);
	});

	test('Passed pattern is wrong', async () => {
		const fglob = new FGlob();

		const paths = await fglob.getPathsToFiles('./src/test/fglobTest', '');

		expect(paths).toEqual([
			'./src/test/fglobTest/test1.txt',
			'./src/test/fglobTest/innerFolder/test1.txt',
			'./src/test/fglobTest/innerFolder/test2.txt',
		]);
	});
});

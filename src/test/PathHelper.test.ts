import PathHelper from '../Helpers/PathHelper';
import globalSettings from '../../GlobalSettings';

describe('Tests for PathHelper', () => {
	describe('Testing getBaselineFolder', () => {
		test('Empty string', () => {
			const result = PathHelper.getBaselineFolder('');

			expect(result).toEqual('.');
		});
		test('Path to baseline image turns into baseline folder', () => {
			const result = PathHelper.getBaselineFolder(
				'./projects/project1/test1/img1.png',
			);

			expect(result).toEqual('./projects/project1/test1');
		});
	});
	describe('Testing getActualStatusFolder', () => {
		test('Empty string', () => {
			const result = PathHelper.getActualStatusFolder('');

			expect(result).toEqual(`/${globalSettings.actualStatusFolderName}`);
		});
		test('Path to baseline image turns into actualStatus folder', () => {
			const result = PathHelper.getActualStatusFolder(
				'./projects/project1/test1/img1.png',
			);

			expect(result).toEqual(
				`projects/project1/test1/${globalSettings.actualStatusFolderName}`,
			);
		});
	});
	describe('Testing getActualStatusImage', () => {
		test('Empty string', () => {
			const result = PathHelper.getActualStatusImage('');

			expect(result).toEqual(
				`/${globalSettings.actualStatusFolderName}/`,
			);
		});
		test('Path to baseline image turns into actualStatus image', () => {
			const result = PathHelper.getActualStatusImage(
				'./projects/project1/test1/img1.png',
			);

			expect(result).toEqual(
				`projects/project1/test1/${globalSettings.actualStatusFolderName}/img1.png`,
			);
		});
	});
	describe('Testing getOutputImage', () => {
		test('Empty string', () => {
			const result = PathHelper.getOutputImage('');

			expect(result).toEqual(`/${globalSettings.outputFolderName}/`);
		});
		test('Path to baseline image turns into output image', () => {
			const result = PathHelper.getOutputImage(
				'./projects/project1/test1/img1.png',
			);

			expect(result).toEqual(
				`projects/project1/test1/${globalSettings.outputFolderName}/img1.png`,
			);
		});
	});
	describe('Testing getOutputFolder', () => {
		test('Empty string', () => {
			const result = PathHelper.getOutputFolder('');

			expect(result).toEqual(`/${globalSettings.outputFolderName}`);
		});
		test('Path to baseline image turns into output folder', () => {
			const result = PathHelper.getOutputFolder(
				'./projects/project1/test1/img1.png',
			);

			expect(result).toEqual(
				`projects/project1/test1/${globalSettings.outputFolderName}`,
			);
		});
	});
});

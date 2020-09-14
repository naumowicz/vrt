import ScenarioRunner from '../ScenarioRunner';
import FileSystem from '../FileSystem';
import testConfig from './TestConfig';

const invalidPathToFile = './src/test/imageDoesNotExists.png';
const testimage1 = './src/test/testimage1.png';
const testimage2 = './src/test/testimage2.png';

describe('Tests for ScenarioRunner', () => {
	describe('Testing loadScenarios', () => {
		test('Proper scenario', async () => {
			const scenarioRunner = new ScenarioRunner(
				'./src/test/scenariosForTestingScenarioRunner/test.txt',
			);

			expect(await scenarioRunner.loadScenarios()).toEqual(true);
		});
		test('Scenario does not exsts', async () => {
			const scenarioRunner = new ScenarioRunner(
				'./src/test/scenariosForTestingScenarioRunner/doesNotExists.txt',
			);

			expect(await scenarioRunner.loadScenarios()).toEqual(false);
		});
		test('Empty string as path to scenario', async () => {
			const scenarioRunner = new ScenarioRunner('');

			expect(await scenarioRunner.loadScenarios()).toEqual(false);
		});
		test('Passed path to scenario with issues', async () => {
			const scenarioRunner = new ScenarioRunner(
				'./src/test/scenarioTest/scenarioWithIssues.txt',
			);

			expect(await scenarioRunner.loadScenarios()).toEqual(false);
		});
	});
	describe('Testing createFolders', () => {
		test('Proper scenario', async () => {
			const scenarioRunner = new ScenarioRunner(
				'./src/test/scenariosForTestingScenarioRunner/test.txt',
			);

			await scenarioRunner.loadScenarios();

			expect(scenarioRunner.createFolders()).toEqual(true);

			//cleanup
			expect(
				FileSystem.deleteFolderRecursively(
					'./src/test/scenariosForTestingScenarioRunner/test1',
				),
			).toEqual(true);
		});
		test('Scenario does not exsts', async () => {
			const scenarioRunner = new ScenarioRunner(
				'./src/test/scenariosForTestingScenarioRunner/doesNotExists.txt',
			);

			await scenarioRunner.loadScenarios();

			expect(scenarioRunner.createFolders()).toEqual(false);
		});
		test('Empty string as path to scenario', async () => {
			const scenarioRunner = new ScenarioRunner('');

			await scenarioRunner.loadScenarios();

			expect(scenarioRunner.createFolders()).toEqual(false);
		});
		test('List imagesToAnalyze is empty', async () => {
			const scenarioRunner = new ScenarioRunner('');

			await scenarioRunner.loadScenarios();

			scenarioRunner.scenario.imagesToAnalyze = [];

			expect(scenarioRunner.createFolders()).toEqual(false);
		});
	});
	describe('Tests for compareImages', () => {
		test('Path to original image is invalid', async () => {
			const scenarioRunner = new ScenarioRunner('');

			expect(
				await scenarioRunner.compareImages(
					invalidPathToFile,
					testimage2,
				),
			).toEqual({
				rawMisMatchPercentage: 0,
				misMatchPercentage: '0.00',
				resultBuffer: Buffer.from(''),
			});
		});
		test('Path to compared image is invalid', async () => {
			const scenarioRunner = new ScenarioRunner('');

			expect(
				await scenarioRunner.compareImages(
					testimage1,
					invalidPathToFile,
				),
			).toEqual({
				rawMisMatchPercentage: 0,
				misMatchPercentage: '0.00',
				resultBuffer: Buffer.from(''),
			});
		});
		test('Empty string as path to compared image', async () => {
			const scenarioRunner = new ScenarioRunner('');

			expect(await scenarioRunner.compareImages(testimage1, '')).toEqual({
				rawMisMatchPercentage: 0,
				misMatchPercentage: '0.00',
				resultBuffer: Buffer.from(''),
			});
		});
		test('Empty string as path to original image', async () => {
			const scenarioRunner = new ScenarioRunner('');

			expect(await scenarioRunner.compareImages('', testimage2)).toEqual({
				rawMisMatchPercentage: 0,
				misMatchPercentage: '0.00',
				resultBuffer: Buffer.from(''),
			});
		});
		test('Original and compared images are the same', async () => {
			const scenarioRunner = new ScenarioRunner('');

			expect(
				await scenarioRunner.compareImages(testimage1, testimage1),
			).toEqual({
				rawMisMatchPercentage: 0,
				misMatchPercentage: '0.00',
				resultBuffer: FileSystem.readFile(
					'./src/test/buffer_test_images_equal.png',
				).fileContent,
			});
		});
		test('Original and compared images are different', async () => {
			const scenarioRunner = new ScenarioRunner('');

			expect(
				await scenarioRunner.compareImages(testimage1, testimage2),
			).toEqual({
				rawMisMatchPercentage: 3.057407708570499,
				misMatchPercentage: '3.06',
				resultBuffer: FileSystem.readFile(
					'./src/test/test_images_not_equal.png',
				).fileContent,
			});
		});
	});
	describe('Tests for loadImagesForComparisment', () => {
		test('Path to original image is invalid', () => {
			const scenarioRunner = new ScenarioRunner('');

			expect(
				scenarioRunner.loadImagesForComparisment(
					invalidPathToFile,
					testimage2,
				),
			).toEqual({
				status: `Issue with file ->${invalidPathToFile}<-`,
				originalImageBuffer: Buffer.from(''),
				comparedImageBuffer: Buffer.from(''),
			});
		});
		test('Path to compared image is invalid', () => {
			const scenarioRunner = new ScenarioRunner('');

			expect(
				scenarioRunner.loadImagesForComparisment(
					testimage1,
					invalidPathToFile,
				),
			).toEqual({
				status: `Issue with file ->${invalidPathToFile}<-`,
				originalImageBuffer: Buffer.from(''),
				comparedImageBuffer: Buffer.from(''),
			});
		});
		test('Empty string as path to original image', () => {
			const scenarioRunner = new ScenarioRunner('');

			expect(
				scenarioRunner.loadImagesForComparisment('', testimage2),
			).toEqual({
				status: `Issue with file -><-`,
				originalImageBuffer: Buffer.from(''),
				comparedImageBuffer: Buffer.from(''),
			});
		});
		test('Empty string as path to compared image', () => {
			const scenarioRunner = new ScenarioRunner('');

			expect(
				scenarioRunner.loadImagesForComparisment(testimage1, ''),
			).toEqual({
				status: `Issue with file -><-`,
				originalImageBuffer: Buffer.from(''),
				comparedImageBuffer: Buffer.from(''),
			});
		});
	});
	describe('Tests for returnEmptyComparisment', () => {
		test('Empty string as info', () => {
			const scenarioRunner = new ScenarioRunner('');

			expect(scenarioRunner.returnEmptyComparisment('')).toEqual({
				status: '',
				originalImageBuffer: Buffer.from(''),
				comparedImageBuffer: Buffer.from(''),
			});
		});
		test('Text as info', () => {
			const scenarioRunner = new ScenarioRunner('');

			expect(scenarioRunner.returnEmptyComparisment('test')).toEqual({
				status: 'test',
				originalImageBuffer: Buffer.from(''),
				comparedImageBuffer: Buffer.from(''),
			});
		});
	});
	describe('Tests for runScenarios', () => {
		test(
			'One step scenario',
			async () => {
				const scenarioRunner = new ScenarioRunner(
					'./src/test/scenariosForTestingScenarioRunner/onestep.txt',
				);

				await scenarioRunner.loadScenarios();

				expect(await scenarioRunner.runScenarios()).toEqual(true);

				//cleanup
				FileSystem.deleteFolderRecursively(
					'./src/test/scenariosForTestingScenarioRunner/testRunner/oneStep',
				);
			},
			testConfig.scenarioRunner,
		);
		test(
			'Two step scenario',
			async () => {
				const scenarioRunner = new ScenarioRunner(
					'./src/test/scenariosForTestingScenarioRunner/twosteps.txt',
				);

				await scenarioRunner.loadScenarios();

				expect(await scenarioRunner.runScenarios()).toEqual(true);

				//cleanup
				FileSystem.deleteFolderRecursively(
					'./src/test/scenariosForTestingScenarioRunner/testRunner/twoSteps',
				);
			},
			testConfig.scenarioRunner,
		);
	});
});

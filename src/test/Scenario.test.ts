import Scenario from '../Scenario';
import FileSystem from '../FileSystem';

describe('Checking scenario availability', () => {
	test('Scenario exists', async () => {
		const fileSystem = new FileSystem();
		const scenario = new Scenario();
		const result = await scenario.checkScenarioAvailability(
			'./src/test/scenarioTest/scenario1.txt',
			fileSystem,
		);
		expect(result).toEqual(true);
	});

	test('Scenario does not exist', async () => {
		const fileSystem = new FileSystem();
		const scenario = new Scenario();
		const result = await scenario.checkScenarioAvailability(
			'./src/test/scenarioTest/none.txt',
			fileSystem,
		);
		expect(result).toEqual(false);
	});
});

describe('Checking if scenario is properly configured', () => {
	test('Scenario properly configured', async () => {
		const imagesToAnalyze = [
			'./scenarios/test/test1/baseline/1.png',
			'./scenarios/test/test2/baseline/2.png',
		];
		const steps = [['google.com'], ['google.com/images']];

		const fileSystem = new FileSystem();
		const scenario = new Scenario();
		await scenario.loadScenario(
			'./src/test/scenarioTest/scenario1.txt',
			fileSystem,
		);
		expect(scenario.getScenarioSteps()).toEqual({ steps, imagesToAnalyze });
	});
});

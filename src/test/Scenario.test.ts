import Scenario from '../Scenario';

describe('Checking scenario availability', () => {
	test('Scenario exists', async () => {
		const scenario = new Scenario();
		const result = await scenario.checkScenarioAvailability(
			'./src/test/scenarioTest/scenario1.txt',
		);
		expect(result).toEqual(true);
	});

	test('Scenario does not exist', async () => {
		const scenario = new Scenario();
		const result = await scenario.checkScenarioAvailability(
			'./src/test/scenarioTest/none.txt',
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

		const scenario = new Scenario();
		await scenario.loadScenario('./src/test/scenarioTest/scenario1.txt');

		const result = scenario.getScenarioSteps();
		expect(result.isScenarioParsedSuccessfully).toEqual(true);
		expect(result.steps).toEqual(steps);
		expect(result.imagesToAnalyze).toEqual(imagesToAnalyze);
	});

	test('Scenario has two END keyowrds', async () => {
		const scenario = new Scenario();
		await scenario.loadScenario('./src/test/scenarioTest/scenarioEND.txt');

		const result = scenario.getScenarioSteps();
		expect(result.isScenarioParsedSuccessfully).toEqual(false);
	});
});

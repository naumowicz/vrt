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

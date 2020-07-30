import ConsoleLogger from '../ConsoleLogger';
import colors from '../settings/ConsoleOutputColors';

describe('Testing console output from ConsoleLogger', () => {
	test('Test error log', async () => {
		jest.spyOn(console, 'log');
		const consoleLogger = new ConsoleLogger();
		consoleLogger.error('test error');

		expect(console.log).toHaveBeenCalledTimes(1);
		expect(console.log).toHaveBeenLastCalledWith(
			`${colors.FgRed}test error${colors.Reset}`,
		);

		jest.clearAllMocks();
	});

	test('Test warning log', async () => {
		jest.spyOn(console, 'log');
		const consoleLogger = new ConsoleLogger();
		consoleLogger.warning('test warning');

		expect(console.log).toHaveBeenCalledTimes(1);
		expect(console.log).toHaveBeenLastCalledWith(
			`${colors.FgYellow}test warning${colors.Reset}`,
		);

		jest.clearAllMocks();
	});

	test('Test info log', async () => {
		jest.spyOn(console, 'log');
		const consoleLogger = new ConsoleLogger();
		consoleLogger.info('test info');

		expect(console.log).toHaveBeenCalledTimes(1);
		expect(console.log).toHaveBeenLastCalledWith(
			`${colors.FgWhite}test info${colors.Reset}`,
		);

		jest.clearAllMocks();
	});
});

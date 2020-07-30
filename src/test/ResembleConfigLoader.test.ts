import ResembleConfigLoader from '../ConfigLoaders/ResembleConfigLoader';

describe('Test for ResembleConfigLoader', () => {
	test('File with config does not exits', () => {
		const resembleConfig = {
			red: 255,
			green: 0,
			blue: 255,
			errorType: 'movement',
			transparency: 0.3,
			ignore: 'antialiasing',
		};

		const resembleConfigLoader = new ResembleConfigLoader('');

		expect(resembleConfigLoader.resembleConfig).toEqual(resembleConfig);
	});
});

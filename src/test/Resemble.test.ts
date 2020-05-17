import Resemble from '../Resemble';

describe('Test for Resemble error area color output', () => {
	test('Colors are out of scale', () => {
		const resemble = new Resemble();
		resemble.setErrorOutputColor(-1, 256, undefined);

		expect(resemble.getErrorColor()).toEqual({
			red: 255,
			green: 0,
			blue: 255,
		});
	});

	test('Colors are passed properly', () => {
		const resemble = new Resemble();
		resemble.setErrorOutputColor(1, 200, 20);

		expect(resemble.getErrorColor()).toEqual({
			red: 1,
			green: 200,
			blue: 20,
		});
	});

	test('Colors are undefined', () => {
		const resemble = new Resemble();
		resemble.setErrorOutputColor(undefined, undefined, undefined);

		expect(resemble.getErrorColor()).toEqual({
			red: 255,
			green: 0,
			blue: 255,
		});
	});
});

describe('Test for Resemble output transparency', () => {
	test('Wrong value passed for transparency', () => {
		const resemble = new Resemble();
		resemble.setTransparency(-1);

		expect(resemble.getTransparencyLevel()).toEqual(0.3);
	});

	test('Proper value passed for transparency', () => {
		const resemble = new Resemble();
		resemble.setTransparency(0.4);

		expect(resemble.getTransparencyLevel()).toEqual(0.4);
	});
});

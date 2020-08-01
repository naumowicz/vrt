import Resemble from '../Resemble';
import * as fs from 'fs';
import globalSettings from '../../GlobalSettings';
import Path from '../Path';
import FileSystem from '../FileSystem';
const pathToResembleGlobalSettingsFile = globalSettings.resembleConfigPath;

describe('Test for Resemble error area color output', () => {
	test('Colors are out of scale', () => {
		const resemble = new Resemble(
			Path.resolvePath(pathToResembleGlobalSettingsFile),
		);
		resemble.setErrorOutputColor(-1, 256, undefined);

		expect(resemble.getErrorColor()).toEqual({
			red: 255,
			green: 0,
			blue: 255,
		});
	});

	test('Colors are passed properly', () => {
		const resemble = new Resemble(
			Path.resolvePath(pathToResembleGlobalSettingsFile),
		);
		resemble.setErrorOutputColor(1, 200, 20);

		expect(resemble.getErrorColor()).toEqual({
			red: 1,
			green: 200,
			blue: 20,
		});
	});

	test('Colors are undefined', () => {
		const resemble = new Resemble(
			Path.resolvePath(pathToResembleGlobalSettingsFile),
		);
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
		const resemble = new Resemble(
			Path.resolvePath(pathToResembleGlobalSettingsFile),
		);
		resemble.setTransparency(-1);

		expect(resemble.getTransparencyLevel()).toEqual(0.3);
	});

	test('Proper value passed for transparency', () => {
		const resemble = new Resemble(
			Path.resolvePath(pathToResembleGlobalSettingsFile),
		);
		resemble.setTransparency(0.4);

		expect(resemble.getTransparencyLevel()).toEqual(0.4);
	});
});

describe('Testing Resemblejs comparation with default settings', () => {
	test('Images are the same', async () => {
		const resemble = new Resemble(
			Path.resolvePath(pathToResembleGlobalSettingsFile),
		);

		const image1 = FileSystem.readFile('./src/test/testimage1.png');
		const image2 = FileSystem.readFile('./src/test/testimage1.png');

		const data = await resemble.getDiff(
			image1.fileContent,
			image2.fileContent,
		);

		const expectedImage = FileSystem.readFile(
			'./src/test/buffer_test_images_equal.png',
		).fileContent;

		expect(data.getBuffer().equals(expectedImage)).toEqual(true);
	});
	test('Images are different', async () => {
		const resemble = new Resemble(
			Path.resolvePath(pathToResembleGlobalSettingsFile),
		);

		const image1 = FileSystem.readFile('./src/test/testimage1.png');
		const image2 = FileSystem.readFile('./src/test/testimage2.png');

		const data = await resemble.getDiff(
			image1.fileContent,
			image2.fileContent,
		);

		const expectedImage = FileSystem.readFile(
			'./src/test/test_images_not_equal.png',
		);

		expect(data.getBuffer().equals(expectedImage.fileContent)).toEqual(
			true,
		);
	});
});

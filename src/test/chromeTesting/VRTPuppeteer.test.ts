import VRTPuppeteer from '../../VRTPuppeteer';
import testGlobalSettings from '../testFiles/settingsFilesForVRTPuppeteer/GlobalSettings';
import testGlobalSettingsOppositeValues from '../testFiles/settingsFilesForVRTPuppeteer/puppeteerOppositeValues/GlobalSettings';
import FileSystem from '../../FileSystem';
import TestConfig from '../TestConfig';

describe('Testing VRTPuppeteer', () => {
	test(
		'Starting Puppeteer without settings file',
		async () => {
			let vrtPuppeteer = new VRTPuppeteer('');

			expect(await vrtPuppeteer.start()).toEqual(true);

			expect(vrtPuppeteer.getViewportDetails().width).toEqual(1920);
			expect(vrtPuppeteer.getViewportDetails().height).toEqual(1080);

			expect(await vrtPuppeteer.closeBrowser()).toEqual(true);

			vrtPuppeteer = null;
		},
		TestConfig.puppeteerTimeout,
	);
	test(
		'Starting Puppeteer with settings file',
		async () => {
			let vrtPuppeteer = new VRTPuppeteer(
				testGlobalSettings.puppeteerConfigPath,
			);

			expect(await vrtPuppeteer.start()).toEqual(true);

			expect(vrtPuppeteer.getViewportDetails().width).toEqual(1920);
			expect(vrtPuppeteer.getViewportDetails().height).toEqual(1080);

			expect(await vrtPuppeteer.closeBrowser()).toEqual(true);

			vrtPuppeteer = null;
		},
		TestConfig.puppeteerTimeout,
	);
	test(
		'Starting Puppeteer with settings file containing opposite values',
		async () => {
			let vrtPuppeteer = new VRTPuppeteer(
				testGlobalSettingsOppositeValues.puppeteerConfigPath,
			);

			expect(await vrtPuppeteer.start()).toEqual(true);

			expect(vrtPuppeteer.getViewportDetails().width).toEqual(800);
			expect(vrtPuppeteer.getViewportDetails().height).toEqual(600);

			expect(await vrtPuppeteer.closeBrowser()).toEqual(true);

			vrtPuppeteer = null;
		},
		TestConfig.puppeteerTimeout,
	);
	test(
		'Starting 2 different Puppeteer instances, one with settings file containing opposite values, second without settings',
		async () => {
			let vrtPuppeteer = new VRTPuppeteer(
				testGlobalSettingsOppositeValues.puppeteerConfigPath,
			);

			let vrtPuppeteer2 = new VRTPuppeteer('');

			expect(await vrtPuppeteer.start()).toEqual(true);
			expect(await vrtPuppeteer2.start()).toEqual(true);

			expect(vrtPuppeteer.getViewportDetails().width).toEqual(800);
			expect(vrtPuppeteer.getViewportDetails().height).toEqual(600);
			expect(vrtPuppeteer2.getViewportDetails().width).toEqual(1920);
			expect(vrtPuppeteer2.getViewportDetails().height).toEqual(1080);

			expect(await vrtPuppeteer.closeBrowser()).toEqual(true);
			expect(await vrtPuppeteer2.closeBrowser()).toEqual(true);

			vrtPuppeteer = null;
			vrtPuppeteer2 = null;
		},
		TestConfig.puppeteerTimeout,
	);

	test(
		'Puppeteer goes to https://google.com',
		async () => {
			let vrtPuppeteer = new VRTPuppeteer(
				testGlobalSettings.puppeteerConfigPath,
			);

			expect(await vrtPuppeteer.start()).toEqual(true);

			expect(await vrtPuppeteer.goto('https://www.google.com/')).toEqual(
				true,
			);

			expect(await vrtPuppeteer.closeBrowser()).toEqual(true);

			vrtPuppeteer = null;
		},
		TestConfig.puppeteerTimeout,
	);
	test(
		'Puppeteer goes to https://google.com and then to https://facebook.com/',
		async () => {
			let vrtPuppeteer = new VRTPuppeteer(
				testGlobalSettings.puppeteerConfigPath,
			);

			expect(await vrtPuppeteer.start()).toEqual(true);

			expect(await vrtPuppeteer.goto('https://www.google.com/')).toEqual(
				true,
			);

			expect(await vrtPuppeteer.goto('https://facebook.com/')).toEqual(
				true,
			);

			expect(await vrtPuppeteer.closeBrowser()).toEqual(true);

			vrtPuppeteer = null;
		},
		TestConfig.puppeteerTimeout,
	);

	test(
		'Taking screenshot of https://google.com',
		async () => {
			const pathToScreenshot =
				'./src/test/chromeTesting/placeForPuppeteerScreenshots/screenshot.png';

			let vrtPuppeteer = new VRTPuppeteer(
				testGlobalSettings.puppeteerConfigPath,
			);

			expect(await vrtPuppeteer.start()).toEqual(true);

			expect(await vrtPuppeteer.goto('https://www.google.com/')).toEqual(
				true,
			);

			expect(await vrtPuppeteer.screenshot(pathToScreenshot)).toEqual(
				true,
			);

			expect(await vrtPuppeteer.closeBrowser()).toEqual(true);

			vrtPuppeteer = null;

			expect(
				FileSystem.getFileSize(pathToScreenshot).size > 1000,
			).toEqual(true);

			//cleanup
			FileSystem.deleteFile(pathToScreenshot);
		},
		TestConfig.puppeteerTimeout,
	);

	test(
		'Closing window after loading page',
		async () => {
			let vrtPuppeteer = new VRTPuppeteer(
				testGlobalSettings.puppeteerConfigPath,
			);

			expect(await vrtPuppeteer.start()).toEqual(true);

			expect(await vrtPuppeteer.goto('https://www.google.com/')).toEqual(
				true,
			);

			expect(await vrtPuppeteer.closeBrowser()).toEqual(true);

			vrtPuppeteer = null;
		},
		TestConfig.puppeteerTimeout,
	);
	test(
		'Closing window after starting Puppeteer',
		async () => {
			let vrtPuppeteer = new VRTPuppeteer(
				testGlobalSettings.puppeteerConfigPath,
			);

			expect(await vrtPuppeteer.start()).toEqual(true);

			expect(await vrtPuppeteer.closeBrowser()).toEqual(true);

			vrtPuppeteer = null;
		},
		TestConfig.puppeteerTimeout,
	);

	//TODO: test args passed to puppeteer and expected result
});

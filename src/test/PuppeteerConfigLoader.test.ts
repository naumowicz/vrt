import PuppeteerConfigLoader from '../ConfigLoaders/PuppeteerConfigLoader';
import TestGlobalSettings from './testFiles/settingsFiles/GlobalSettings';

describe('Tests for PuppeteerConfigLoader', () => {
	describe('Empty string to files', () => {
		test('Testing constructor', () => {
			const puppeteerConfigLoader = new PuppeteerConfigLoader('');

			expect(
				puppeteerConfigLoader.puppeteerConfig.puppeteerStartsMaximized,
			).toEqual(true);
			expect(
				puppeteerConfigLoader.puppeteerConfig.puppeteerIsHeadless,
			).toEqual(false);
			expect(
				puppeteerConfigLoader.puppeteerConfig.puppeteerXViewport,
			).toEqual(1920);
			expect(
				puppeteerConfigLoader.puppeteerConfig.puppeteerYViewport,
			).toEqual(1080);
			expect(
				puppeteerConfigLoader.puppeteerConfig.puppeteerGoToWaitUntil,
			).toEqual('networkidle0');
			expect(
				puppeteerConfigLoader.puppeteerConfig
					.puppeteerFullPageScreenshot,
			).toEqual(true);
		});
		test('Testing isWindowsMaximized', () => {
			const puppeteerConfigLoader = new PuppeteerConfigLoader('');

			expect(puppeteerConfigLoader.isWindowsMaximized()).toEqual(true);
		});
		test('Testing isHeadless', () => {
			const puppeteerConfigLoader = new PuppeteerConfigLoader('');

			expect(puppeteerConfigLoader.isHeadless()).toEqual(false);
		});
		test('Testing getXViewport', () => {
			const puppeteerConfigLoader = new PuppeteerConfigLoader('');

			expect(puppeteerConfigLoader.getXViewport()).toEqual(1920);
		});
		test('Testing getYViewport', () => {
			const puppeteerConfigLoader = new PuppeteerConfigLoader('');

			expect(puppeteerConfigLoader.getYViewport()).toEqual(1080);
		});
		test('Testing getGoToWaitUntil', () => {
			const puppeteerConfigLoader = new PuppeteerConfigLoader('');

			expect(puppeteerConfigLoader.getGoToWaitUntil()).toEqual(
				'networkidle0',
			);
		});
		test('Testing isFullPageScreenshotUsed', () => {
			const puppeteerConfigLoader = new PuppeteerConfigLoader('');

			expect(puppeteerConfigLoader.isFullPageScreenshotUsed()).toEqual(
				true,
			);
		});
	});
	describe('Proper globalSettings', () => {
		test('Testing constructor', () => {
			const puppeteerConfigLoader = new PuppeteerConfigLoader(
				TestGlobalSettings.puppeteerConfigPath,
			);

			expect(
				puppeteerConfigLoader.puppeteerConfig.puppeteerStartsMaximized,
			).toEqual(false);
			expect(
				puppeteerConfigLoader.puppeteerConfig.puppeteerIsHeadless,
			).toEqual(true);
			expect(
				puppeteerConfigLoader.puppeteerConfig.puppeteerXViewport,
			).toEqual(800);
			expect(
				puppeteerConfigLoader.puppeteerConfig.puppeteerYViewport,
			).toEqual(600);
			expect(
				puppeteerConfigLoader.puppeteerConfig.puppeteerGoToWaitUntil,
			).toEqual('domcontentloaded');
			expect(
				puppeteerConfigLoader.puppeteerConfig
					.puppeteerFullPageScreenshot,
			).toEqual(false);
		});
		test('Testing isWindowsMaximized', () => {
			const puppeteerConfigLoader = new PuppeteerConfigLoader(
				TestGlobalSettings.puppeteerConfigPath,
			);

			expect(puppeteerConfigLoader.isWindowsMaximized()).toEqual(false);
		});
		test('Testing isHeadless', () => {
			const puppeteerConfigLoader = new PuppeteerConfigLoader(
				TestGlobalSettings.puppeteerConfigPath,
			);

			expect(puppeteerConfigLoader.isHeadless()).toEqual(true);
		});
		test('Testing getXViewport', () => {
			const puppeteerConfigLoader = new PuppeteerConfigLoader(
				TestGlobalSettings.puppeteerConfigPath,
			);

			expect(puppeteerConfigLoader.getXViewport()).toEqual(800);
		});
		test('Testing getYViewport', () => {
			const puppeteerConfigLoader = new PuppeteerConfigLoader(
				TestGlobalSettings.puppeteerConfigPath,
			);

			expect(puppeteerConfigLoader.getYViewport()).toEqual(600);
		});
		test('Testing getGoToWaitUntil', () => {
			const puppeteerConfigLoader = new PuppeteerConfigLoader(
				TestGlobalSettings.puppeteerConfigPath,
			);

			expect(puppeteerConfigLoader.getGoToWaitUntil()).toEqual(
				'domcontentloaded',
			);
		});
		test('Testing isFullPageScreenshotUsed', () => {
			const puppeteerConfigLoader = new PuppeteerConfigLoader(
				TestGlobalSettings.puppeteerConfigPath,
			);

			expect(puppeteerConfigLoader.isFullPageScreenshotUsed()).toEqual(
				false,
			);
		});
	});
});

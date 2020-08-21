import puppeteer from 'puppeteer';
import { PendingXHR } from 'pending-xhr-puppeteer';
import PuppeteerConfigLoader from './ConfigLoaders/PuppeteerConfigLoader';
import puppeteerArgs from './PuppeteerArgs';

class VRTPuppeteer {
	browser: puppeteer.Browser;
	page: puppeteer.Page;
	pendingXHR: PendingXHR;
	puppeteerConfig: PuppeteerConfigLoader;

	constructor(pathToPuppeteerGlobalSettingsFile: string) {
		this.puppeteerConfig = new PuppeteerConfigLoader(
			pathToPuppeteerGlobalSettingsFile,
		);
	}

	async start(): Promise<boolean> {
		const receivedArgs = [];
		if (this.puppeteerConfig.isWindowsMaximized()) {
			receivedArgs.push(puppeteerArgs.startMaximized);
		}

		this.browser = await puppeteer.launch({
			headless: this.puppeteerConfig.isHeadless(),
			args: receivedArgs,
		});

		this.page = await this.browser.newPage();

		await this.page.setViewport({
			width: this.puppeteerConfig.getXViewport(),
			height: this.puppeteerConfig.getYViewport(),
		});

		this.pendingXHR = new PendingXHR(this.page);

		return true;
	}

	async goto(url: string): Promise<boolean> {
		await this.page.goto(url, {
			waitUntil: this.puppeteerConfig.getGoToWaitUntil(),
		});
		await this.pendingXHR.waitForAllXhrFinished();

		return true;
	}

	async screenshot(destinationPath: string): Promise<boolean> {
		await this.page.screenshot({
			path: destinationPath,
			fullPage: this.puppeteerConfig.isFullPageScreenshotUsed(),
		});

		return true;
	}

	async closeBrowser(): Promise<boolean> {
		await this.browser.close();
		return true;
	}

	getViewportDetails(): {
		width: number;
		height: number;
		deviceScaleFactor?: number;
		isMobile?: boolean;
		hasTouch?: boolean;
		isLandscape?: boolean;
	} {
		return this.page.viewport();
	}
}

export default VRTPuppeteer;

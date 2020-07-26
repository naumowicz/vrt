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

	async start(): Promise<void> {
		const receivedArgs = [];
		if (this.puppeteerConfig.isWindowsMaximized) {
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
	}

	async goto(url: string): Promise<void> {
		await this.page.goto(url, {
			waitUntil: this.puppeteerConfig.getGoToWaitUntil(),
		});
		await this.pendingXHR.waitForAllXhrFinished();
	}

	async screenshot(destinationPath: string): Promise<void> {
		await this.page.screenshot({
			path: destinationPath,
			fullPage: this.puppeteerConfig.isFullPageScreenshotUsed(),
		});
	}

	async closeBrowser(): Promise<void> {
		await this.browser.close();
	}
}

export default VRTPuppeteer;

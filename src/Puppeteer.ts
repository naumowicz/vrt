import puppeteer from 'puppeteer';
import { PendingXHR } from 'pending-xhr-puppeteer';

class Puppeteer {
	browser: puppeteer.Browser;
	page: puppeteer.Page;
	pendingXHR: PendingXHR;

	async start(): Promise<void> {
		this.browser = await puppeteer.launch({
			headless: false,
			args: ['--start-maximized'],
		});
		this.page = await this.browser.newPage();
		await this.page.setViewport({ width: 1920, height: 1080 });
		this.pendingXHR = new PendingXHR(this.page);
	}

	async goto(url: string): Promise<void> {
		await this.page.goto(url, { waitUntil: 'networkidle0' });
		await this.pendingXHR.waitForAllXhrFinished();
	}

	async screenshot(destinationPath: string): Promise<void> {
		await this.page.screenshot({ path: destinationPath, fullPage: true });
	}

	async closeBrowser(): Promise<void> {
		await this.browser.close();
	}
}

export default Puppeteer;

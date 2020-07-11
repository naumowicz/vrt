import FileSystem from '../FileSystem';

interface PuppeteerConfig {
	puppeteerStartsMaximized: boolean;
	puppeteerIsHeadless: boolean;
	puppeteerXViewport: number;
	puppeteerYViewport: number;
	puppeteerGoToWaitUntil:
		| 'load'
		| 'domcontentloaded'
		| 'networkidle0'
		| 'networkidle2';
}

class PuppeteerConfigLoader {
	puppeteerConfig: PuppeteerConfig;

	constructor(gloablSettings: string) {
		const rawFile = FileSystem.readFile(gloablSettings);

		if (rawFile.status) {
			this.puppeteerConfig = JSON.parse(rawFile.fileContent.toString());
		} else {
			this.puppeteerConfig.puppeteerStartsMaximized = true;
			this.puppeteerConfig.puppeteerIsHeadless = false;
			this.puppeteerConfig.puppeteerXViewport = 1920;
			this.puppeteerConfig.puppeteerYViewport = 1080;
			this.puppeteerConfig.puppeteerGoToWaitUntil = 'networkidle0';
		}
	}

	isWindowsMaximized(): boolean {
		return this.puppeteerConfig.puppeteerStartsMaximized;
	}

	isHeadless(): boolean {
		return this.puppeteerConfig.puppeteerIsHeadless;
	}

	getXViewport(): number {
		return this.puppeteerConfig.puppeteerXViewport;
	}

	getYViewport(): number {
		return this.puppeteerConfig.puppeteerYViewport;
	}

	getGoToWaitUntil():
		| 'load'
		| 'domcontentloaded'
		| 'networkidle0'
		| 'networkidle2' {
		return this.puppeteerConfig.puppeteerGoToWaitUntil;
	}
}

export default PuppeteerConfigLoader;

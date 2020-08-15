class TestConfig {
	puppeteerTimeout: number;
	constructor() {
		this.puppeteerTimeout = 15000;
	}
}

export default new TestConfig();

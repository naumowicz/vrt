class TestConfig {
	puppeteerTimeout: number;
	scenarioRunner: number;
	constructor() {
		this.puppeteerTimeout = 15000;
		this.scenarioRunner = 30000;
	}
}

export default new TestConfig();

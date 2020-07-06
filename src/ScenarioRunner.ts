import Scenario from './Scenario';

class ScenarioRunner {
	scenario: Scenario;
	pathToScenario: string;

	constructor(pathToScenario: string) {
		this.scenario = new Scenario();
		this.pathToScenario = pathToScenario;
	}

	loadScenarios(): boolean {
		if (
			this.scenario.checkScenarioAvailability(this.pathToScenario) ===
			false
		) {
			//log error
			return false;
		}

		this.scenario.loadScenario(this.pathToScenario);

		if (this.scenario.isScenarioParsedSuccessfully() === false) {
			//log error
			return false;
		}
	}
}

export default ScenarioRunner;

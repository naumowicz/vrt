import fileSystem from '../helpers/fileSystem';
import ScenarioDefinition from './scenarioDefinition';

class Scenario {
	path: string;
	scenario: Record<string, unknown>;
	constructor(path: string) {
		this.path = path;
	}

	async checkAccessToScenarioFile(): Promise<boolean> {
		return await fileSystem.checkAccessToPath(this.path);
	}

	async readScenarioFile(): Promise<boolean> {
		const result = await fileSystem.readJSONFile(this.path);
		if (result.success) {
			// fix name
			this.scenario = result.data;
			return true;
		} else {
			return false;
		}
	}

	checkScenario(): boolean {
		const scenarioDefinition = new ScenarioDefinition();
		if (scenarioDefinition.isUsingProperBrowser(this.scenario)) {
			//wrong browser
			return false;
		}

		if (scenarioDefinition.isUsingProperResolutionFormat(this.scenario)) {
			//wrong resolution
			return false;
		}

		if (scenarioDefinition.isUsingProperIgnoringAlghoritm(this.scenario) === false) {
			//wrong ignoring algorithm
			return false;
		}

		if (scenarioDefinition.isUsingProperErrorType(this.scenario) === false) {
			//checking error type
			return false;
		}

		//all ok
		return true;
	}
}

export default Scenario;

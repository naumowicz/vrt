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
			//ok browser
		} else {
			//wrong browser
			return false;
		}

		if (scenarioDefinition.isUsingProperResolutionFormat(this.scenario)) {
			//ok resolution
		} else {
			//wrong resolution
			return false;
		}

		if (scenarioDefinition.isUsingProperIgnoringAlghoritm(this.scenario)) {
			//ok ignoring algorithm
		} else {
			//wrong ignoring algorithm
			return false;
		}

		if (scenarioDefinition.isUsingProperErrorType(this.scenario)) {
			//ok error type
			//all ok
			return true;
		} else {
			//wrong error type
			return false;
		}
	}
}

export default Scenario;

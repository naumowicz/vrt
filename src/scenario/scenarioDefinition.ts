interface ScenarioDefinition {
	browser: string;
	resolution: RegExp;
	headless: boolean;
	autosavingBaseline: boolean;
	ignoringAlgorithm: string;
	errorType: string;
	errorColor: {
		red: number;
		green: number;
		blue: number;
	};
	transparency: number;
	largeImageThreshold: number;
	setReturnEarlyThreshold: number | undefined; //be sure about checking type
	scaleToSameSize: boolean;
	scenarioTasks: Array<ScenarioTask>;
}

interface ScenarioTask {
	tag: [string];
	boundingBoxes: [Box | Record<string, never>];
	ignoredBoxes: [Box | Record<string, never>];
	script: null | string;
	actions: [Action];
}

interface Box {
	left: number;
	top: number;
	right: number;
	bottom: number;
}

interface Action {
	action: string;
	target: string;
	value: string;
}

class scenarioRules {
	browser: Array<string> = ['chrome'];
	resolution = /\d+x\d+/;
	ignoringAlgorithm: Array<string> = ['nothing', 'less', 'antialiasing', 'colors', 'alpha'];
	errorType: Array<string> = [
		'flat',
		'movement',
		'flatDifferenceIntensity',
		'movementDifferenceIntensity',
		'diffOnly',
	];
	scenario: unknown;
	constructor(scenario: unknown) {
		this.scenario = scenario;
	}

	isUsingProperBrowser(): boolean {
		const expectedScenarioType = this.scenario as ScenarioDefinition;
		return 'browser' in expectedScenarioType ? this.browser.includes(expectedScenarioType.browser) : false;
	}

	isUsingProperResolutionFormat(): boolean {
		const expectedScenarioType = this.scenario as ScenarioDefinition;
		return 'resolution' in expectedScenarioType
			? this.resolution.test(expectedScenarioType.resolution.toString())
			: false;
	}

	isUsingProperIgnoringAlghoritm(): boolean {
		const expectedScenarioType = this.scenario as ScenarioDefinition;
		return 'ignoringAlgorithm' in expectedScenarioType
			? this.ignoringAlgorithm.includes(expectedScenarioType.ignoringAlgorithm)
			: false;
	}

	isUsingProperErrorType(): boolean {
		const expectedScenarioType = this.scenario as ScenarioDefinition;
		return 'errorType' in expectedScenarioType ? this.errorType.includes(expectedScenarioType.errorType) : false;
	}
}

export default scenarioRules;

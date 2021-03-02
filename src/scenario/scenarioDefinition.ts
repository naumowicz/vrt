interface ScenarioRules {
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
	actions: null | [Action];
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

class ScenarioDefinition {
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

	isUsingProperBrowser(scenario: unknown): scenario is ScenarioRules {
		const expectedScenarioType = scenario as ScenarioRules;
		return 'browser' in expectedScenarioType ? this.browser.includes(expectedScenarioType.browser) : false;
	}

	isUsingProperResolutionFormat(scenario: unknown): scenario is ScenarioRules {
		const expectedScenarioType = scenario as ScenarioRules;
		return 'resolution' in expectedScenarioType
			? this.resolution.test(expectedScenarioType.resolution.toString())
			: false;
	}

	isUsingProperHeadlessMode(scenario: unknown): scenario is ScenarioRules {
		const expectedScenarioType = scenario as ScenarioRules;
		return 'headless' in expectedScenarioType ? typeof expectedScenarioType === 'boolean' : false;
	}

	isUsingProperAutosavingBaselineFormat(scenario: unknown): scenario is ScenarioRules {
		const expectedScenarioType = scenario as ScenarioRules;
		return 'autosavingBaseline' in expectedScenarioType ? typeof expectedScenarioType === 'boolean' : false;
	}

	isUsingProperIgnoringAlghoritm(scenario: unknown): scenario is ScenarioRules {
		const expectedScenarioType = scenario as ScenarioRules;
		return 'ignoringAlgorithm' in expectedScenarioType
			? this.ignoringAlgorithm.includes(expectedScenarioType.ignoringAlgorithm)
			: false;
	}

	isUsingProperErrorType(scenario: unknown): scenario is ScenarioRules {
		const expectedScenarioType = scenario as ScenarioRules;
		return 'errorType' in expectedScenarioType ? this.errorType.includes(expectedScenarioType.errorType) : false;
	}

	isUsingProperErrorColorFormat(scenario: unknown): scenario is ScenarioRules {
		const expectedScenarioType = scenario as ScenarioRules;
		if ('errorColor' in expectedScenarioType && typeof expectedScenarioType === 'object') {
			if (
				typeof expectedScenarioType.errorColor.red === 'number' &&
				typeof expectedScenarioType.errorColor.green === 'number' &&
				typeof expectedScenarioType.errorColor.blue === 'number'
			) {
				if (expectedScenarioType.errorColor.red < 0 && expectedScenarioType.errorColor.red > 255) {
					//wrong value for red
					return false;
				}
				if (expectedScenarioType.errorColor.green < 0 && expectedScenarioType.errorColor.green > 255) {
					//wrong value for green
					return false;
				}
				if (expectedScenarioType.errorColor.blue < 0 && expectedScenarioType.errorColor.blue > 255) {
					//wrong value for blue
					return false;
				}
			} else {
				//wrong type of color
				return false;
			}
		} else {
			//wrong type or no property available
			return false;
		}

		//all ok
		return true;
	}

	isUsingTransparencyProperType(scenario: unknown): scenario is ScenarioRules {
		const expectedScenarioType = scenario as ScenarioRules;
		if ('transparency' in expectedScenarioType && typeof expectedScenarioType.transparency === 'number') {
			if (expectedScenarioType.transparency < 0 && expectedScenarioType.transparency > 1) {
				//wrong value of transparency
				return false;
			}
		} else {
			//wrong type or no property available

			return false;
		}

		return true;
	}

	isUsingLargeImageThresholdProperType(scenario: unknown): scenario is ScenarioRules {
		const expectedScenarioType = scenario as ScenarioRules;
		if (
			'largeImageThreshold' in expectedScenarioType &&
			typeof expectedScenarioType.largeImageThreshold === 'number'
		) {
			if (expectedScenarioType.largeImageThreshold < 0 && expectedScenarioType.largeImageThreshold % 1 === 0) {
				//wrong value of largeImageThreshold, or is float
				return false;
			}
		} else {
			//wrong type or no property available
			return false;
		}

		return true;
	}

	isUsingSetReturnEarlyThresholdProperType(scenario: unknown): scenario is ScenarioRules {
		const expectedScenarioType = scenario as ScenarioRules;
		if (
			'setReturnEarlyThreshold' in expectedScenarioType &&
			(typeof expectedScenarioType.setReturnEarlyThreshold === 'number' ||
				typeof expectedScenarioType.setReturnEarlyThreshold === 'string')
		) {
			if (expectedScenarioType.setReturnEarlyThreshold < 0 && expectedScenarioType.setReturnEarlyThreshold > 1) {
				//wrong value of setReturnEarlyThreshold
				return false;
			}
		} else {
			//wrong type or no property available
			return false;
		}

		return true;
	}

	isUsingScaleToSameSizeProperType(scenario: unknown): scenario is ScenarioRules {
		const expectedScenarioType = scenario as ScenarioRules;
		if (
			'largeImageThreshold' in expectedScenarioType &&
			typeof expectedScenarioType.largeImageThreshold === 'number'
		) {
			if (expectedScenarioType.largeImageThreshold < 0 && expectedScenarioType.largeImageThreshold % 1 === 0) {
				//wrong value of largeImageThreshold, or is float
				return false;
			}
		} else {
			//wrong type or no property available
			return false;
		}

		return true;
	}
}

export default ScenarioDefinition;

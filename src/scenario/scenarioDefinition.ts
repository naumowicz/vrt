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
	setReturnEarlyThreshold: number;
	scaleToSameSize: boolean;
	scenarioTasks: Array<ScenarioTask>;
}

interface ScenarioTask {
	tags: Array<string>;
	boundingBoxes: [Box] | Record<string, never>;
	ignoredBoxes: [Box] | Record<string, never>;
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
			const { red, green, blue } = expectedScenarioType.errorColor;
			if (Number.isInteger(red) && Number.isInteger(green) && Number.isInteger(blue)) {
				if (red < 0 && red > 255) {
					//wrong value for red
					return false;
				}
				if (green < 0 && green > 255) {
					//wrong value for green
					return false;
				}
				if (blue < 0 && blue > 255) {
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
			Number.isInteger(expectedScenarioType.largeImageThreshold)
		) {
			if (expectedScenarioType.largeImageThreshold < 0) {
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
		const setReturnEarlyThreshold = expectedScenarioType.setReturnEarlyThreshold;
		if ('setReturnEarlyThreshold' in expectedScenarioType && Number.isInteger(setReturnEarlyThreshold)) {
			if (Number.isInteger(setReturnEarlyThreshold)) {
				if (setReturnEarlyThreshold >= 0) {
					return true;
				} else {
					return false;
				}
			}
		}

		return true;
	}

	isUsingScaleToSameSizeProperType(scenario: unknown): scenario is ScenarioRules {
		const expectedScenarioType = scenario as ScenarioRules;
		if ('scaleToSameSize' in expectedScenarioType && typeof expectedScenarioType.scaleToSameSize === 'boolean') {
			return true;
		} else {
			//wrong type or no property available
			return false;
		}
	}

	isHavingProperFormatOfScenarioTasks(scenario: unknown): scenario is ScenarioRules {
		const expectedScenarioType = scenario as ScenarioRules;
		if ('scenarioTasks' in expectedScenarioType && Array.isArray(expectedScenarioType.scenarioTasks)) {
			//scenario tasks exist and is array
			expectedScenarioType.scenarioTasks.forEach((scenarioTask) => {
				if (Array.isArray(scenarioTask.tags) === false || scenarioTask.tags.length === 0) {
					// if there are no tags
					return false;
				} else {
					scenarioTask.tags.forEach((tag) => {
						// if any of tag has length of 0
						if (tag.length === 0) {
							return false;
						}
					});
				}
			});
		} else {
			return false;
		}
		return true;
	}

	isBoxHavingProperFormat(box: unknown): box is Box {
		const expectedBox = box as Box;
		if ('left' in expectedBox && 'top' in expectedBox && 'right' in expectedBox && 'bottom' in expectedBox) {
			const maxReasonableSize = 10000;
			for (const [, value] of Object.entries(expectedBox)) {
				if (Number.isInteger(value) && (value < 0 || value > maxReasonableSize)) {
					return false;
				}
			}
		} else {
			return false;
		}
		return true;
	}
}

export default ScenarioDefinition;

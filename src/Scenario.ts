import FileSystem from './FileSystem';
import LineByLine from 'n-readlines';

class Scenario {
	steps: Array<string[]>;
	imagesToAnalyze: string[];
	errorLogs: string[];

	async checkScenarioAvailability(
		pathToScenario: string,
		fileSystem: FileSystem,
	): Promise<boolean> {
		return fileSystem.checkAvailability(pathToScenario);
	}

	loadScenario(pathToScenario: string): void {
		const scenario = this.splitScenario(pathToScenario);
		this.parseScenario(scenario);
	}

	splitScenario(pathToScenario: string): string[] {
		const scenario = [];
		const liner = new LineByLine(pathToScenario);
		let line: boolean | Buffer;
		while ((line = liner.next())) {
			scenario.push(line.toString());
		}
		return scenario;
	}

	parseScenario(scenario: string[]): void {
		let tmpArray: string[];
		let endKeywordCount = 0;

		for (let line = 0; line < scenario.length; line++) {
			switch (true) {
				case scenario[line].split(' ')[0] === 'SCRIPT:':
					tmpArray.push(scenario[line]);
					break;
				case scenario[line] === 'NEXT':
					this.steps.push(tmpArray);
					tmpArray = [];
					line++;
					this.imagesToAnalyze.push(scenario[line]);
					break;
				case scenario[line] === 'END':
					if (endKeywordCount === 1) {
						//log error
					}
					endKeywordCount++;
					this.steps.push(tmpArray);
					break;
				case scenario[line] === '\n':
				case scenario[line] === '':
				case scenario[line] === '\r\n':
					break;
				default:
					//place to log error
					break;
			}
		}
	}

	isScenarioParsedSuccessfully(): boolean {
		if (this.errorLogs.length > 0) {
			return false;
		} else {
			return false;
		}
	}
}

export default Scenario;

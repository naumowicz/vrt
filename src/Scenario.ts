import FileSystem from './FileSystem';
import * as ReadLine from 'readline';

class Scenario {
	steps: Array<Array<string>>;
	imagesToAnalyze: string[];
	errorLogs: string[];

	async checkScenarioAvailability(
		pathToScenario: string,
		fileSystem: FileSystem,
	): Promise<boolean> {
		return fileSystem.checkAvailability(pathToScenario);
	}

	async loadScenario(
		pathToScenario: string,
		fileSystem: FileSystem,
	): Promise<void> {
		const scenario = await this.splitScenario(pathToScenario, fileSystem);
		this.parseScenario(scenario);
	}

	async splitScenario(
		pathToScenario: string,
		fileSystem: FileSystem,
	): Promise<string[]> {
		const scenario = [];
		const fileStream = fileSystem.createReadStream(pathToScenario);
		const rl = ReadLine.createInterface({
			input: fileStream,
			crlfDelay: Infinity,
		});
		for await (const line of rl) {
			scenario.push(line);
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

	getScenarioSteps(): {
		steps: Array<Array<string>>;
		imagesToAnalyze: string[];
	} {
		const steps = this.steps;
		const imagesToAnalyze = this.imagesToAnalyze;
		return { steps, imagesToAnalyze };
	}
}

export default Scenario;

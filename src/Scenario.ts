import FileSystem from './FileSystem';
import * as ReadLine from 'readline';

class Scenario {
	steps: Array<Array<string>>;
	imagesToAnalyze: string[];
	errorLogs: string[];

	constructor() {
		this.steps = [];
		this.imagesToAnalyze = [];
		this.errorLogs = [];
	}

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
		const urlRegex = /(http:\/\/|https:\/\/)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

		let tmpArray: string[] = [];
		let endKeywordCount = 0;

		this.imagesToAnalyze.push(scenario[0]);

		for (let line = 1; line < scenario.length; line++) {
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
					if (endKeywordCount >= 1) {
						this.errorLogs.push(
							`Received additonal unnecessery END keyword`,
						);
					}
					endKeywordCount++;
					this.steps.push(tmpArray);
					break;
				case scenario[line] === '\n':
				case scenario[line] === '':
				case scenario[line] === '\r\n':
					break;
				case urlRegex.test(scenario[line]):
					tmpArray.push(scenario[line]);
					break;
				default:
					this.errorLogs.push(
						`Received ${line} - it is not valid scenario line`,
					);
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
		isScenarioParsedSuccessfully: boolean;
		steps: Array<Array<string>>;
		imagesToAnalyze: string[];
	} {
		const isScenarioParsedSuccessfully = this.isScenarioParsedSuccessfully();
		const steps = this.steps;
		const imagesToAnalyze = this.imagesToAnalyze;
		return { isScenarioParsedSuccessfully, steps, imagesToAnalyze };
	}
}

export default Scenario;

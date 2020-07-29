import * as ReadLine from 'readline';
import FileSystem from './FileSystem';

class Scenario {
	scenario: Array<string>;
	steps: Array<Array<string>>;
	imagesToAnalyze: string[];
	errorLogs: string[];

	constructor() {
		this.scenario = [];
		this.steps = [];
		this.imagesToAnalyze = [];
		this.errorLogs = [];
	}

	checkScenarioAvailability(pathToScenario: string): boolean {
		return FileSystem.checkAvailability(pathToScenario);
	}

	async loadScenario(pathToScenario: string): Promise<void> {
		await this.splitScenario(pathToScenario);
		this.parseScenario(this.scenario);
	}

	async splitScenario(pathToScenario: string): Promise<void> {
		const fileStream = FileSystem.createReadStream(pathToScenario);
		const rl = ReadLine.createInterface({
			input: fileStream,
			crlfDelay: Infinity,
		});
		for await (const line of rl) {
			this.scenario.push(line);
		}
	}

	parseScenario(scenario: string[]): void {
		const urlRegex = /(http:\/\/|https:\/\/)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
		const pngRegex = /.*\.png$/;

		let tmpArray: string[] = [];
		let endKeywordCount = 0;

		if (pngRegex.test(scenario[0]) === false) {
			this.addErrorToArray(scenario[0], 0);
		}
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
					if (pngRegex.test(scenario[line]) === false) {
						this.imagesToAnalyze.push(scenario[line]);
					}
					this.imagesToAnalyze.push(scenario[line]);
					break;
				case scenario[line] === 'END':
					if (endKeywordCount >= 1) {
						this.addCustomErrorToArray(
							'Received additional unnecessery END keyword',
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
					this.addErrorToArray(scenario[line], line);
					break;
			}
		}
	}

	addErrorToArray(line: string, numberOfLine: number): void {
		this.errorLogs.push(
			`Received ->${line}<- - it is not valid scenario line. Check line ${
				numberOfLine + 1
			}`,
		);
	}

	addCustomErrorToArray(line: string): void {
		this.errorLogs.push(line);
	}

	isScenarioParsedSuccessfully(): boolean {
		return this.errorLogs.length === 0;
	}

	getScenarioSteps(): {
		steps: Array<Array<string>>;
		imagesToAnalyze: string[];
	} {
		const steps = this.steps;
		const imagesToAnalyze = this.imagesToAnalyze;
		return { steps, imagesToAnalyze };
	}

	getErrors(): Array<string> {
		return this.errorLogs;
	}
}

export default Scenario;

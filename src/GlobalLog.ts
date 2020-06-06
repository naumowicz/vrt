import FileSystem from './FileSystem';

class GlobalLog {
	globalLogEleventyMarkdownTableHeaders: string[] = [
		'Log Level',
		'Status',
		'Time',
	];
	eleventyLayoutFromMarkdownToHTML = 'layout.html';
	pathToGlobalLog: string;

	constructor(pathToGlobalLog: string, fileSystem: FileSystem) {
		this.pathToGlobalLog = pathToGlobalLog;
		this.addEleventyLayout(fileSystem);
	}

	async addEleventyLayout(fileSystem: FileSystem): Promise<void> {
		await fileSystem.appendToFile(this.pathToGlobalLog, '---\n');
		await fileSystem.appendToFile(
			this.pathToGlobalLog,
			`layout: ${this.eleventyLayoutFromMarkdownToHTML}`,
		);
		await fileSystem.appendToFile(this.pathToGlobalLog, '---\n\n');
	}

	async addAdditionalInfoToLogs(
		info: string,
		fileSystem: FileSystem,
	): Promise<void> {
		await fileSystem.appendToFile(this.pathToGlobalLog, info);
	}

	addHeaderOfTableToLogs(fileSystem: FileSystem): void {
		let header = '|';
		for (const element of this.globalLogEleventyMarkdownTableHeaders) {
			header = header.concat(`${element}|`);
		}

		fileSystem.appendToFile(this.pathToGlobalLog, `${header}\n`);

		let separator = '|';
		for (
			let i = 0;
			i < this.globalLogEleventyMarkdownTableHeaders.length;
			i++
		) {
			separator = separator.concat('---|');
		}

		fileSystem.appendToFile(this.pathToGlobalLog, `${separator}\n`);
	}

	appendLineOfLogsToTable(line: string, fileSystem: FileSystem): void {
		const log = line.replace(': ', '§').split('§');

		let logLine = '|';
		for (const element of log) {
			logLine = logLine.concat(`${element}|`);
		}

		fileSystem.appendToFile(this.pathToGlobalLog, `${logLine}\n`);
	}
}

export default GlobalLog;

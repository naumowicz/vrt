import FileSystem from './FileSystem';

class GlobalLog {
	globalLogEleventyMarkdownTableHeaders: string[] = [
		'Log Level',
		'Status',
		'Time',
	];
	eleventyLayoutFromMarkdownToHTML = 'layout.html';
	pathToGlobalLog: string;

	constructor(pathToGlobalLog: string) {
		this.pathToGlobalLog = pathToGlobalLog;
		this.addEleventyLayout();
	}

	addEleventyLayout(): void {
		FileSystem.appendToFile(this.pathToGlobalLog, '---\n');
		FileSystem.appendToFile(
			this.pathToGlobalLog,
			`layout: ${this.eleventyLayoutFromMarkdownToHTML}`,
		);
		FileSystem.appendToFile(this.pathToGlobalLog, '---\n\n');
	}

	addAdditionalInfoToLogs(info: string): void {
		FileSystem.appendToFile(this.pathToGlobalLog, info);
	}

	addHeaderOfTableToLogs(): void {
		let header = '|';
		for (const element of this.globalLogEleventyMarkdownTableHeaders) {
			header = header.concat(`${element}|`);
		}

		FileSystem.appendToFile(this.pathToGlobalLog, `${header}\n`);

		let separator = '|';
		for (
			let i = 0;
			i < this.globalLogEleventyMarkdownTableHeaders.length;
			i++
		) {
			separator = separator.concat('---|');
		}

		FileSystem.appendToFile(this.pathToGlobalLog, `${separator}\n`);
	}

	appendLineOfLogsToTable(line: string): void {
		const log = line.replace(': ', '§').split('§');

		let logLine = '|';
		for (const element of log) {
			logLine = logLine.concat(`${element}|`);
		}

		FileSystem.appendToFile(this.pathToGlobalLog, `${logLine}\n`);
	}
}

export default GlobalLog;

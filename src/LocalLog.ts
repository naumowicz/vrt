import FileSystem from './FileSystem';

interface Prefixes {
	errorPrefix: string;
	warningPrefix: string;
	infoPrefix: string;
	debugPrefix: string;
}

class LocalLog {
	pathToLocalLogFile: string;
	errorPrefix: string;
	warningPrefix: string;
	infoPrefix: string;
	debugPrefix: string;

	constructor(prefixes: Prefixes) {
		this.errorPrefix = prefixes.errorPrefix;
		this.warningPrefix = prefixes.warningPrefix;
		this.infoPrefix = prefixes.infoPrefix;
		this.debugPrefix = prefixes.debugPrefix;
	}

	async createLocalLogFile(
		pathToLocalLogFolfer: string,
		nameOfLocalLogFile: string,
	): Promise<void> {
		//add time stamp
		this.pathToLocalLogFile = `${pathToLocalLogFolfer}/${nameOfLocalLogFile}`;
		FileSystem.createFolder(pathToLocalLogFolfer);
		FileSystem.writeFile(pathToLocalLogFolfer, Buffer.from(''));
	}

	error(error: string): void {
		FileSystem.appendToFile(this.pathToLocalLogFile, this.errorPrefix);
		FileSystem.appendToFile(this.pathToLocalLogFile, `${error}\n`);
	}

	warning(warning: string): void {
		FileSystem.appendToFile(this.pathToLocalLogFile, this.warningPrefix);
		FileSystem.appendToFile(this.pathToLocalLogFile, `${warning}\n`);
	}

	info(info: string): void {
		FileSystem.appendToFile(this.pathToLocalLogFile, this.infoPrefix);
		FileSystem.appendToFile(this.pathToLocalLogFile, `${info}\n`);
	}

	debug(debug: string): void {
		FileSystem.appendToFile(this.pathToLocalLogFile, this.debugPrefix);
		FileSystem.appendToFile(this.pathToLocalLogFile, `${debug}\n`);
	}
}

export default LocalLog;

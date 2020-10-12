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

	createLocalLogFile(
		pathToLocalLogFolfer: string,
		nameOfLocalLogFile: string,
	): boolean {
		//add time stamp
		//generatedPath/ + filename
		this.pathToLocalLogFile = `${pathToLocalLogFolfer}${nameOfLocalLogFile}`;
		if (FileSystem.createFolder(pathToLocalLogFolfer) === false) {
			//fix me add details about error
			return false;
		}
		if (
			FileSystem.writeFile(pathToLocalLogFolfer, Buffer.from('')) ===
			false
		) {
			//fix me add details about error
			return false;
		}

		return true;
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

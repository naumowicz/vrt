import FileSystem from './FileSystem';

class GlobalLogMerger {
	listOfLocalLogFiles: Array<string>;

	constructor(listOfLocalLogFiles: Array<string>) {
		this.listOfLocalLogFiles = listOfLocalLogFiles;
	}

	merge(pathToGlobalLog: string): void {
		for (const logFile of this.listOfLocalLogFiles) {
			const fileContent = FileSystem.readFile(logFile);
			FileSystem.appendToFile(pathToGlobalLog, fileContent.toString());
		}
	}
}

export default GlobalLogMerger;

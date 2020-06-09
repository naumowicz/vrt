import FileSystem from './FileSystem';

class GlobalLogMerger {
	listOfLocalLogFiles: Array<string>;

	constructor(listOfLocalLogFiles: Array<string>) {
		this.listOfLocalLogFiles = listOfLocalLogFiles;
	}

	async merge(pathToGlobalLog: string): Promise<void> {
		for (const logFile of this.listOfLocalLogFiles) {
			const fileContent = await FileSystem.readFile(logFile);
			await FileSystem.appendToFile(
				pathToGlobalLog,
				fileContent.toString(),
			);
		}
	}
}

export default GlobalLogMerger;

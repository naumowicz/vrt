import FileSystem from './FileSystem';

class FolderController {
	static createBaselineFolder(pathToBaselineFolder: string): boolean {
		if (FileSystem.checkAvailability(pathToBaselineFolder)) {
			return true;
		} else {
			return FileSystem.createFolderRecursively(pathToBaselineFolder);
		}
	}

	static recreateOutputAndActualStatusFolders(
		pathToOutputFolder: string,
		pathToActualStatusFolder: string,
	): boolean {
		if (
			FileSystem.checkAvailability(pathToOutputFolder) &&
			FileSystem.checkAvailability(pathToActualStatusFolder)
		) {
			if (
				FileSystem.deleteFolderRecursively(pathToOutputFolder) ===
					false ||
				FileSystem.deleteFolderRecursively(pathToActualStatusFolder) ===
					false
			) {
				return false;
			}
		}

		if (
			FileSystem.createFolderRecursively(pathToOutputFolder) === false ||
			FileSystem.createFolderRecursively(pathToActualStatusFolder) ===
				false
		) {
			return false;
		}

		return true;
	}
}

export default FolderController;

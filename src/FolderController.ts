import FileSystem from './FileSystem';

class FolderController {
	createBaselineFolder(pathToBaselineFolder: string): boolean {
		if (FileSystem.checkAvailability(pathToBaselineFolder)) {
			return true;
		} else {
			return FileSystem.createFolder(pathToBaselineFolder);
		}
	}

	recreateOutputAndActualStatusFolders(
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
			FileSystem.createFolder(pathToOutputFolder) === false ||
			FileSystem.createFolder(pathToActualStatusFolder) === false
		) {
			return false;
		}

		return true;
	}
}

export default FolderController;

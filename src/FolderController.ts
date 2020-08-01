import FileSystem from './FileSystem';

class FolderController {
	createBaselineFolder(pathToBaselineFolder: string): boolean {
		return FileSystem.createFolder(pathToBaselineFolder);
	}

	recreateOutputAndActualStatusFolders(
		pathToOutputFolder: string,
		pathToActualStatusFolder: string,
	): boolean {
		if (
			FileSystem.deleteFolderRecursively(pathToOutputFolder) &&
			FileSystem.deleteFolderRecursively(pathToActualStatusFolder)
		) {
		} else {
			return false;
		}

		if (
			FileSystem.createFolder(pathToOutputFolder) &&
			FileSystem.createFolder(pathToActualStatusFolder)
		) {
		} else {
			return false;
		}

		return true;
	}
}

export default FolderController;

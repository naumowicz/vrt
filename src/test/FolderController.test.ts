import FolderController from '../FolderController';
import FileSystem from '../FileSystem';
import Path from '../Path';

describe('Testing FolderController', () => {
	test('Test for creating baseline folder', () => {
		const folderName = './src/test/testBaselineFolder';
		const pathToFolder = Path.resolvePath(folderName);

		FolderController.createBaselineFolder(pathToFolder);

		expect(FileSystem.checkAvailability(pathToFolder)).toEqual(true);

		//cleanup
		FileSystem.deleteFolderRecursively(pathToFolder);
	});

	test('Test for recreating output and actualStatus folders', () => {
		const outputFolderName = './src/test/testOutputFolder';
		//fixme: path.join:
		const fileInOutputFolder = '/output.txt';
		const actualStatusFolderName = './src/test/testActualStatusFolder';
		const fileInActualStatusFolder = '/actualStatus.txt';
		const pathToOutputFolder = Path.resolvePath(outputFolderName);
		const pathToActualStatusFolder = Path.resolvePath(
			actualStatusFolderName,
		);

		//creating test folders
		expect(FileSystem.createFolder(pathToOutputFolder)).toEqual(true);
		expect(FileSystem.createFolder(pathToActualStatusFolder)).toEqual(true);

		//creating files in generated folders
		expect(
			FileSystem.writeFile(
				Path.resolvePath(outputFolderName + fileInOutputFolder),
				Buffer.alloc(0),
			),
		).toEqual(true);
		expect(
			FileSystem.writeFile(
				Path.resolvePath(outputFolderName + fileInActualStatusFolder),
				Buffer.alloc(0),
			),
		).toEqual(true);

		//recreating folders by tested module
		expect(
			FolderController.recreateOutputAndActualStatusFolders(
				pathToOutputFolder,
				pathToActualStatusFolder,
			),
		).toEqual(true);

		//check if folders were created
		expect(FileSystem.checkAvailability(pathToOutputFolder)).toEqual(true);
		expect(FileSystem.checkAvailability(pathToActualStatusFolder)).toEqual(
			true,
		);

		//cleanup
		expect(FileSystem.deleteFolderRecursively(pathToOutputFolder)).toEqual(
			true,
		);
		expect(
			FileSystem.deleteFolderRecursively(pathToActualStatusFolder),
		).toEqual(true);
	});

	test('Recreate folders that do not exitst', () => {
		const outputFolderName = './src/test/wrongTestOutputFolder';
		const actualStatusFolderName = './src/test/wrongTestActualStatusFolder';

		const pathToOutputFolder = Path.resolvePath(outputFolderName);
		const pathToActualStatusFolder = Path.resolvePath(
			actualStatusFolderName,
		);

		expect(
			FolderController.recreateOutputAndActualStatusFolders(
				pathToOutputFolder,
				pathToActualStatusFolder,
			),
		).toEqual(true);

		//cleanup
		expect(FileSystem.deleteFolderRecursively(pathToOutputFolder)).toEqual(
			true,
		);
		expect(
			FileSystem.deleteFolderRecursively(pathToActualStatusFolder),
		).toEqual(true);
	});
});

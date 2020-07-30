import FolderControlller from '../FolderController';
import FileSystem from '../FileSystem';
import Path from '../Path';

describe('Testing FolderController', () => {
	test('Test for creating baseline folder', () => {
		const folderController = new FolderControlller();

		const folderName = './src/test/testBaselineFolder';
		const pathToFolder = Path.resolvePath(folderName);

		folderController.createBaselineFolder(pathToFolder);

		expect(FileSystem.checkAvailability(pathToFolder)).toEqual(true);

		//cleanup
		FileSystem.removeFolderRecursively(pathToFolder);
	});

	test('Test for recreating output and actualStatus folders', () => {
		const folderController = new FolderControlller();

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
		expect(FileSystem.createFolder(outputFolderName)).toEqual(true);
		expect(FileSystem.createFolder(actualStatusFolderName)).toEqual(true);

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
			folderController.recreateOutputAndActualStatusFolders(
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
		expect(FileSystem.removeFolderRecursively(pathToOutputFolder)).toEqual(
			true,
		);
		expect(
			FileSystem.removeFolderRecursively(pathToActualStatusFolder),
		).toEqual(true);
	});

	test('Removing folders that do not exitst', () => {
		const folderController = new FolderControlller();

		const outputFolderName = './src/test/wrongTestOutputFolder';
		const actualStatusFolderName = './src/test/wrongTestActualStatusFolder';

		const pathToOutputFolder = Path.resolvePath(outputFolderName);
		const pathToActualStatusFolder = Path.resolvePath(
			actualStatusFolderName,
		);

		expect(
			folderController.recreateOutputAndActualStatusFolders(
				pathToOutputFolder,
				pathToActualStatusFolder,
			),
		).toEqual(true);

		//cleanup
		expect(FileSystem.removeFolderRecursively(pathToOutputFolder)).toEqual(
			true,
		);
		expect(
			FileSystem.removeFolderRecursively(pathToActualStatusFolder),
		).toEqual(true);
	});
});

import FileSystem from '../FileSystem';

describe('Testing FileSystem', () => {
	describe('Test for writeFile', () => {
		test('File already exists, gets replaced', () => {
			const result = FileSystem.writeFile(
				'./src/test/fileSystemTest/alreadyExists.txt',
				Buffer.alloc(0),
			);
			expect(result).toEqual(true);
		});
		test('File does not exists yet', () => {
			const file = './src/test/fileSystemTest/doesNotExistsYet.txt';
			const result = FileSystem.writeFile(file, Buffer.alloc(0));
			expect(result).toEqual(true);
			expect(FileSystem.checkAvailability(file)).toEqual(true);

			//cleanup
			FileSystem.deleteFile(file);
			expect(FileSystem.checkAvailability(file)).toEqual(false);
		});
	});

	describe('Test for readFile', () => {
		test('File does not exists', () => {
			const result = FileSystem.readFile(
				'./src/test/fileSystemTest/doesNotExists.txt',
			);
			expect(result.status).toEqual(false);
			expect(result.fileContent).toEqual(Buffer.from(''));
		});
		test('File exists', () => {
			const result = FileSystem.readFile(
				'./src/test/fileSystemTest/fileExists.txt',
			);
			expect(result.status).toEqual(true);
			expect(result.fileContent).toEqual(Buffer.from('content of file'));
		});
	});

	describe('Test for deleteFile', () => {
		test('File does not exists', () => {
			const result = FileSystem.deleteFile(
				'./src/test/fileSystemTest/doesNotExists.txt',
			);
			expect(result).toEqual(false);
		});
		test('File exists', () => {
			const file = './src/test/fileSystemTest/deleteMe.txt';
			const result = FileSystem.deleteFile(file);
			expect(result).toEqual(true);

			//cleanup
			expect(FileSystem.writeFile(file, Buffer.from(''))).toEqual(true);
		});
	});

	describe('Test for deleteFolderRecursively', () => {
		test('Folder does not exists', () => {
			const result = FileSystem.deleteFolderRecursively(
				'./src/test/fileSystemTest/doesNotExists',
			);
			expect(result).toEqual(false);
		});
		test('Folder exists', () => {
			const folder = './src/test/fileSystemTest/folderToBeDeleted';
			const result = FileSystem.deleteFolderRecursively(folder);
			expect(result).toEqual(true);

			//cleanup
			expect(FileSystem.createFolder(folder)).toEqual(true);
		});
		test('File passed as argument', () => {
			const folder =
				'./src/test/fileSystemTest/fileThatShouldBeFolder.txt';
			const result = FileSystem.deleteFolderRecursively(folder);
			expect(result).toEqual(false);
		});
	});

	describe('Test for appendToFile', () => {
		test('File does not exists', () => {
			const file = './src/test/fileSystemTest/fileDoesNotExists.txt';
			const result = FileSystem.appendToFile(file, 'a');
			expect(result).toEqual(true);

			//cleanup
			expect(FileSystem.deleteFile(file)).toEqual(true);
		});
		test('Given path is folder', () => {
			const result = FileSystem.appendToFile(
				'./src/test/fileSystemTest',
				'a',
			);
			expect(result).toEqual(false);
		});
		test('Given path is empty string', () => {
			const result = FileSystem.appendToFile('', 'a');
			expect(result).toEqual(false);
		});
		test('Everything is saved properly', () => {
			const file = './src/test/fileSystemTest/appendingToFile.txt';
			const result = FileSystem.appendToFile(file, 'a');
			expect(result).toEqual(true);

			//cleanup
			expect(FileSystem.writeFile(file, Buffer.from('a'))).toEqual(true);
			expect(FileSystem.readFile(file).fileContent.toString()).toEqual(
				'a',
			);
		});
		test('Given content to append is empty string', () => {
			const file = './src/test/fileSystemTest/appendingToFile.txt';
			const result = FileSystem.appendToFile(file, '');
			expect(result).toEqual(true);
			expect(FileSystem.readFile(file).fileContent.toString()).toEqual(
				'a',
			);
		});
	});
	describe('Tests for createFolder', () => {
		test('Creating folder properly', () => {
			const folder = './src/test/fileSystemTest/testForCreatingFolders';
			expect(FileSystem.createFolder(folder)).toEqual(true);
			expect(FileSystem.checkAvailability(folder)).toEqual(true);

			//cleanup
			expect(FileSystem.deleteFolderRecursively(folder)).toEqual(true);
		});
		test('Given path to folder is empty string', () => {
			const folder = '';
			expect(FileSystem.createFolder(folder)).toEqual(false);
		});
		test('Given path to folder that alredy exists', () => {
			const folder = './src/test/fileSystemTest/folderAlreadyExists';
			expect(FileSystem.createFolder(folder)).toEqual(false);
		});
	});
	describe('Tests for checkIfIsFileOrFolder', () => {
		test('Given path to folder', () => {
			const folder = './src/test/fileSystemTest/folderAlreadyExists';
			expect(FileSystem.checkIfIsFileOrFolder(folder)).toEqual(
				'directory',
			);
		});
		test('Given path to file', () => {
			const file =
				'./src/test/fileSystemTest/folderAlreadyExists/empty.txt';
			expect(FileSystem.checkIfIsFileOrFolder(file)).toEqual('file');
		});
		test('Passed empty path', () => {
			const folder = '';
			expect(FileSystem.checkIfIsFileOrFolder(folder)).toEqual(undefined);
		});
	});
	describe('Tests for saveJSONToFile', () => {
		test('Proper JSON object', () => {
			const object = {
				name: 'Me',
				surname: 'Mine',
				age: 'enough',
			};
			const file = './src/test/fileSystemTest/properJSONObject.json';
			expect(FileSystem.saveJSONToFile(file, object)).toEqual(true);
			expect(FileSystem.readFile(file).fileContent.toString()).toEqual(
				'{"name":"Me","surname":"Mine","age":"enough"}',
			);

			//cleanup
			expect(FileSystem.deleteFile(file)).toEqual(true);
		});
		test('Empty JSON object', () => {
			const object = {};
			const file = './src/test/fileSystemTest/emptyJSONObject.json';
			expect(FileSystem.saveJSONToFile(file, object)).toEqual(true);
			expect(FileSystem.readFile(file).fileContent.toString()).toEqual(
				'{}',
			);

			//cleanup
			expect(FileSystem.deleteFile(file)).toEqual(true);
		});
		test('Passed empty string to save', () => {
			const emptyString = '';
			const file = './src/test/fileSystemTest/emptyString.json';
			expect(FileSystem.saveJSONToFile(file, emptyString)).toEqual(true);
			expect(FileSystem.readFile(file).fileContent.toString()).toEqual(
				'""',
			);

			//cleanup
			expect(FileSystem.deleteFile(file)).toEqual(true);
		});
		test('Passed empty path to file', () => {
			const object = {};
			const file = '';
			expect(FileSystem.saveJSONToFile(file, object)).toEqual(false);
		});
		test('Passed path to folder', () => {
			const object = {};
			const folder = './src/test/fileSystemTest/folderAlreadyExists';
			expect(FileSystem.saveJSONToFile(folder, object)).toEqual(false);
		});
	});
});

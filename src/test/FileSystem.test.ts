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
});

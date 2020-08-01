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
			FileSystem.removeFolderRecursively(file);
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
});

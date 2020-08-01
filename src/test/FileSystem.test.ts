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
			const file = './src/test/fileSystemTest/doesNotExists.txt';
			const result = FileSystem.writeFile(file, Buffer.alloc(0));
			expect(result).toEqual(true);
			expect(FileSystem.checkAvailability(file)).toEqual(true);

			//cleanup
			FileSystem.removeFolderRecursively(file);
			expect(FileSystem.checkAvailability(file)).toEqual(false);
		});
	});
});

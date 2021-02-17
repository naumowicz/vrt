import FileSystem from '../../helpers/fileSystem';

const writeFileProperly = './src/test/sandbox/fileSystem/writingFileProperly.txt';

const deleteFileProperly = './src/test/sandbox/fileSystem/deleteFileProperly.txt';

describe('Testing writeFile', () => {
	test('writing file properly', async () => {
		await FileSystem.writeFile(writeFileProperly, Buffer.from('OK'));

		expect(await FileSystem.checkAccessToPath(writeFileProperly)).toEqual(true);
		const contentOfFile = FileSystem.readFile(writeFileProperly);
		expect((await contentOfFile).success).toEqual(true);
		expect((await contentOfFile).data).toEqual(Buffer.from('OK'));

		//cleanup
		expect(await FileSystem.deleteFile(writeFileProperly)).toEqual(true);
	});
});

describe('Testing deleteFile', () => {
	test('deleting file properly', async () => {
		await FileSystem.deleteFile(deleteFileProperly);

		expect(await FileSystem.checkAccessToPath(deleteFileProperly)).toEqual(false);

		expect(await FileSystem.writeFile(deleteFileProperly, Buffer.from(''))).toEqual(true);
	});
});

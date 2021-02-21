import FileSystem from '../../helpers/fileSystem';

const writeFileProperly = './src/test/sandbox/fileSystem/writingFileProperly.txt';
const deleteFileProperly = './src/test/sandbox/fileSystem/deleteFileProperly.txt';
const writeFileWrongPath = './src/test/sandbox/fileSystem/wrongFolder/writeFile.txt';
const readFileProperly = './src/test/sandbox/fileSystem/readFile.txt';
const pathToFolder = './src/test/sandbox/fileSystem';
const deleteFolder = './src/test/sandbox/fileSystem/deletingFolder';
const deleteFilermdir = 'src/test/sandbox/fileSystem/deleteFilermdir.txt';

describe('Testing writeFile', () => {
	test('writing file properly', async () => {
		expect(await FileSystem.writeFile(writeFileProperly, Buffer.from('OK'))).toEqual(true);

		expect(await FileSystem.checkAccessToPath(writeFileProperly)).toEqual(true);
		const contentOfFile = await FileSystem.readFile(writeFileProperly);
		expect(contentOfFile.success).toEqual(true);
		expect(contentOfFile.data).toEqual(Buffer.from('OK'));

		//cleanup
		expect(await FileSystem.deleteFile(writeFileProperly)).toEqual(true);
	});
	test('writing file at folder that does not exists', async () => {
		expect(await FileSystem.writeFile(writeFileWrongPath, 'Test')).toEqual(false);
	});
});

describe('Testing readFile', () => {
	test('reading file properly', async () => {
		const contentOfFile = await FileSystem.readFile(readFileProperly);
		expect(contentOfFile.success).toEqual(true);
		expect(contentOfFile.data).toEqual(Buffer.from('Test'));
	});
	test('reading file that does not exists', async () => {
		const contentOfFile = await FileSystem.readFile(writeFileWrongPath);
		expect(contentOfFile.success).toEqual(false);
		expect(contentOfFile.data).toEqual(Buffer.from(''));
	});
});

describe('Testing deleteFile', () => {
	test('deleting file properly', async () => {
		expect(await FileSystem.deleteFile(deleteFileProperly)).toEqual(true);

		expect(await FileSystem.checkAccessToPath(deleteFileProperly)).toEqual(false);

		expect(await FileSystem.writeFile(deleteFileProperly, '')).toEqual(true);
	});
	test('trying to delete file that does not exists', async () => {
		expect(await FileSystem.deleteFile(writeFileWrongPath)).toEqual(false);
	});
});

describe('Testing isFolder', () => {
	test('path to folder', async () => {
		expect(await FileSystem.isFolder(pathToFolder)).toEqual({ success: true, folder: true });
	});
	test('path to file', async () => {
		expect(await FileSystem.isFolder(readFileProperly)).toEqual({ success: true, folder: false });
	});
	test('path that does not exists', async () => {
		expect(await FileSystem.isFolder(writeFileWrongPath)).toEqual({ success: false, folder: false });
	});
});

describe('Testing deleteFolder', () => {
	test('path to folder', async () => {
		expect(await FileSystem.deleteFolder(deleteFolder)).toEqual(true);

		//cleanup
		expect(await FileSystem.createFolder(deleteFolder)).toEqual(true);
		expect(await FileSystem.writeFile(`${deleteFolder}/.gitkeep`, '')).toEqual(true);
	});
	test('path to file', async () => {
		expect(await FileSystem.deleteFolder(deleteFilermdir)).toEqual(false);
	});
	test('path that does not exists', async () => {
		expect(await FileSystem.deleteFolder(writeFileWrongPath)).toEqual(false);
	});
});

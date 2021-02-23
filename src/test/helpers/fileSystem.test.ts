import FileSystem from '../../helpers/fileSystem';
import readline from 'readline';

const writeFileProperly = './src/test/sandbox/fileSystem/writingFileProperly.txt';
const deleteFileProperly = './src/test/sandbox/fileSystem/deleteFileProperly.txt';
const writeFileWrongPath = './src/test/sandbox/fileSystem/wrongFolder/writeFile.txt';
const readFileProperly = './src/test/sandbox/fileSystem/readFile.txt';
const pathToFolder = './src/test/sandbox/fileSystem';
const deleteFolder = './src/test/sandbox/fileSystem/deletingFolder';
const deleteFilermdir = './src/test/sandbox/fileSystem/deleteFilermdir.txt';
const createFolder = './src/test/sandbox/fileSystem/createFolder';
const folderAlreadyExists = './src/test/sandbox/fileSystem/folderAlreadyExists';
const folderDoesNotExists = './src/test/sandbox/fileSystem/folderDoesNotExists';
const appendToFile = './src/test/sandbox/fileSystem/appendToFile.txt';
const createReadStream = './src/test/sandbox/fileSystem/createReadStream.txt';

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

describe('Testing createFolder', () => {
	test('path to folder that does not exists', async () => {
		expect(await FileSystem.createFolder(createFolder)).toEqual(true);

		//cleanup
		expect(await FileSystem.deleteFolder(createFolder)).toEqual(true);
	});
	test('path to folder that already exists', async () => {
		expect(await FileSystem.createFolder(folderAlreadyExists)).toEqual(false);
	});
	test('path to file', async () => {
		expect(await FileSystem.createFolder(deleteFilermdir)).toEqual(false);
	});
	test('path that does not exists', async () => {
		expect(await FileSystem.createFolder(writeFileWrongPath)).toEqual(false);
	});
});

describe('Testing checkAccessToPath', () => {
	test('path to folder that does not exists', async () => {
		expect(await FileSystem.checkAccessToPath(folderDoesNotExists)).toEqual(false);
	});
	test('path to folder that exists', async () => {
		expect(await FileSystem.checkAccessToPath(pathToFolder)).toEqual(true);
	});
	test('path to file', async () => {
		expect(await FileSystem.checkAccessToPath(readFileProperly)).toEqual(true);
	});
	test('path that does not exists', async () => {
		expect(await FileSystem.checkAccessToPath(writeFileWrongPath)).toEqual(false);
	});
});

describe('Testing appendToFile', () => {
	test('path to folder that does not exists', async () => {
		expect(await FileSystem.appendToFile(folderDoesNotExists, 'OK')).toEqual(false);
	});
	test('path to folder that exists', async () => {
		expect(await FileSystem.appendToFile(pathToFolder, 'OK')).toEqual(false);
	});
	test('path to file for appending', async () => {
		expect(await FileSystem.appendToFile(appendToFile, 'OK')).toEqual(true);

		expect((await FileSystem.readFile(appendToFile)).data).toEqual(Buffer.from('OK'));

		//cleanup
		expect(await FileSystem.deleteFile(appendToFile)).toEqual(true);
		expect(await FileSystem.writeFile(appendToFile, '')).toEqual(true);
	});
	test('path that does not exists', async () => {
		expect(await FileSystem.appendToFile(writeFileWrongPath, 'OK')).toEqual(false);
	});
});

describe('Testing createReadStream', () => {
	test('path to folder that does not exists', async () => {
		expect(await FileSystem.createReadStream(folderDoesNotExists)).toEqual({
			success: false,
			readStream: undefined,
		});
	});
	test('path to folder that exists', async () => {
		expect(await FileSystem.createReadStream(pathToFolder)).toEqual({ success: false, readStream: undefined });
	});
	test('path to file', async () => {
		const readStreamResult = await FileSystem.createReadStream(createReadStream);

		expect(readStreamResult.success).toEqual(true);

		const readInterface = readline.createInterface({
			input: readStreamResult.readStream,
		});

		readInterface.on('line', (line) => {
			expect(line).toEqual('read me');
		});
	});
	test('path that does not exists', async () => {
		expect(await FileSystem.createReadStream(writeFileWrongPath)).toEqual({
			success: false,
			readStream: undefined,
		});
	});
});

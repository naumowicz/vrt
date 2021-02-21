import path from '../../helpers/path';

describe('Testing getFolder', () => {
	test('empty path', () => {
		expect(path.getFoler('')).toEqual({ success: false, data: '' });
	});
	test('proper path', () => {
		expect(path.getFoler('/test/folder')).toEqual({ success: true, data: 'folder' });
	});
	test('path with / at the end', () => {
		expect(path.getFoler('/test/folder/')).toEqual({ success: true, data: 'folder' });
	});
	test('path with extension', () => {
		expect(path.getFoler('/test/folder/file.txt')).toEqual({ success: false, data: '' });
	});
});

describe('Testing hasExtenstion', () => {
	test('empty path', () => {
		expect(path.hasExtension('')).toEqual(false);
	});
	test('proper path', () => {
		expect(path.hasExtension('/test/folder')).toEqual(false);
	});
	test('path with / at the end', () => {
		expect(path.hasExtension('/test/folder/')).toEqual(false);
	});
	test('path with extension', () => {
		expect(path.hasExtension('/test/folder/file.txt')).toEqual(true);
	});
});

describe('Testing getFile', () => {
	test('empty path', () => {
		expect(path.getFile('')).toEqual({ success: false, data: '' });
	});
	test('path to folder', () => {
		expect(path.getFile('/test/folder')).toEqual({ success: false, data: '' });
	});
	test('path with / at the end', () => {
		expect(path.getFile('/test/folder/')).toEqual({ success: false, data: '' });
	});
	test('path with extension', () => {
		expect(path.getFile('/test/folder/file.txt')).toEqual({ success: true, data: 'file.txt' });
	});
});

describe('Testing hasExtension', () => {
	test('empty path', () => {
		expect(path.hasExtension('')).toEqual(false);
	});
	test('path to folder', () => {
		expect(path.hasExtension('/test/folder')).toEqual(false);
	});
	test('path with / at the end', () => {
		expect(path.hasExtension('/test/folder/')).toEqual(false);
	});
	test('path with extension', () => {
		expect(path.hasExtension('/test/folder/file.txt')).toEqual(true);
	});
});

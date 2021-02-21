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

describe('Testing getExtensions', () => {
	test('empty path', () => {
		expect(path.getExtensions('')).toEqual({ success: false, data: '' });
	});
	test('path to folder', () => {
		expect(path.getExtensions('/test/folder')).toEqual({ success: false, data: '' });
	});
	test('path with / at the end', () => {
		expect(path.getExtensions('/test/folder/')).toEqual({ success: false, data: '' });
	});
	test('path with extension', () => {
		expect(path.getExtensions('/test/folder/file.txt')).toEqual({ success: true, data: '.txt' });
	});
});

describe('Testing convertToPosix', () => {
	test('empty path', () => {
		expect(path.convertToPosix('')).toEqual('');
	});
	test('just /', () => {
		expect(path.convertToPosix('/')).toEqual('/');
	});
	test('path to folder', () => {
		expect(path.convertToPosix('/test/folder')).toEqual('/test/folder');
	});
	test('path with / at the end', () => {
		expect(path.convertToPosix('/test/folder/')).toEqual('/test/folder/');
	});
	test('path with extension', () => {
		expect(path.convertToPosix('/test/folder/file.txt')).toEqual('/test/folder/file.txt');
	});
	test('Windows path', () => {
		expect(path.convertToPosix('C:\\test\\folder')).toEqual('C:/test/folder');
	});
	test('Windows path with \\ at the end', () => {
		expect(path.convertToPosix('C:\\test\\folder\\')).toEqual('C:/test/folder/');
	});
	test('Windows path with extension', () => {
		expect(path.convertToPosix('C:\\test\\folder\\file.txt')).toEqual('C:/test/folder/file.txt');
	});
});

describe('Testing parsePath', () => {
	test('empty path', () => {
		expect(path.parsePath('')).toEqual({ root: '', dir: '', base: '', ext: '', name: '' });
	});
	test('path to folder', () => {
		expect(path.parsePath('/test/folder')).toEqual({
			root: '/',
			dir: '/test',
			base: 'folder',
			ext: '',
			name: 'folder',
		});
	});
	test('path with / at the end', () => {
		expect(path.parsePath('/test/folder/')).toEqual({
			root: '/',
			dir: '/test',
			base: 'folder',
			ext: '',
			name: 'folder',
		});
	});
	test('path with extension', () => {
		expect(path.parsePath('/test/folder/file.txt')).toEqual({
			root: '/',
			dir: '/test/folder',
			base: 'file.txt',
			ext: '.txt',
			name: 'file',
		});
	});
	test('Windows path with extension', () => {
		expect(path.parsePath('C:/test/folder/file.txt')).toEqual({
			root: '',
			dir: 'C:/test/folder',
			base: 'file.txt',
			ext: '.txt',
			name: 'file',
		});
	});
	test('Windows path', () => {
		expect(path.parsePath('C:/test/folder')).toEqual({
			root: '',
			dir: 'C:/test',
			base: 'folder',
			ext: '',
			name: 'folder',
		});
	});
	test('Windows path with / at the end', () => {
		expect(path.parsePath('C:/test/folder/')).toEqual({
			root: '',
			dir: 'C:/test',
			base: 'folder',
			ext: '',
			name: 'folder',
		});
	});
});

describe('Testing normalizePath', () => {
	test('empty path', () => {
		expect(path.normalizePath('')).toEqual('.');
	});
	test('just /', () => {
		expect(path.normalizePath('/')).toEqual('/');
	});
	test('path to folder', () => {
		expect(path.normalizePath('/test/folder')).toEqual('/test/folder');
	});
	test('path with / at the end', () => {
		expect(path.normalizePath('/test/folder/')).toEqual('/test/folder/');
	});
	test('path with extension', () => {
		expect(path.normalizePath('/test/folder/file.txt')).toEqual('/test/folder/file.txt');
	});
	test('path with ..', () => {
		expect(path.normalizePath('/test/folder/../file.txt')).toEqual('/test/file.txt');
	});
	test('path with .', () => {
		expect(path.normalizePath('/test/folder/./file.txt')).toEqual('/test/folder/file.txt');
	});
});

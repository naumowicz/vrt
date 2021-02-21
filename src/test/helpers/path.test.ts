import path from '../../helpers/path';

describe('Testing getFolder', () => {
	test('empty path', () => {
		expect(path.getFoler('')).toEqual({success: false, data: ''})
	});
	test('proper path', () => {
		expect(path.getFoler('/test/folder')).toEqual({success: true, data: 'folder'})
	});
	test('proper path with / at the end', () => {
		expect(path.getFoler('/test/folder/')).toEqual({success: true, data: 'folder'})
	});
	test('path with extension', () => {
		expect(path.getFoler('/test/folder/file.txt')).toEqual({success: false, data: ''})
	});
});
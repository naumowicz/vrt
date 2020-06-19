import Path from '../Path';

describe('Test for path.dirname features', () => {
	test('Properly given path', () => {
		const dirname = Path.returnDirname('/foo/bar/baz/asdf/quux');

		expect(dirname).toEqual('/foo/bar/baz/asdf');
	});
});

describe('Test for path.basename features', () => {
	test('Path to file without extension', () => {
		const dirname = Path.returnFileName('/foo/bar/baz/asdf/quux');

		expect(dirname).toEqual('quux');
	});

	test('Path to file with extension', () => {
		const dirname = Path.returnFileName('/foo/bar/baz/asdf/quux.exe');

		expect(dirname).toEqual('quux.exe');
	});

	test('Path to file with extension, but filename is returned without extension', () => {
		const dirname = Path.returnFileName(
			'/foo/bar/baz/asdf/quux.html',
			'.html',
		);

		expect(dirname).toEqual('quux');
	});

	test('Path to file without extension, but extension is passed to be removed', () => {
		const dirname = Path.returnFileName('/foo/bar/baz/asdf/quux', '.html');

		expect(dirname).toEqual('quux');
	});
});

describe('Test for path.extname features', () => {
	test('No extension', () => {
		const dirname = Path.returnExtensionName('/foo/bar/baz/asdf/quux');

		expect(dirname).toEqual('');
	});

	test('Normal extension', () => {
		const dirname = Path.returnExtensionName('/foo/bar/baz/asdf/quux.ini');

		expect(dirname).toEqual('.ini');
	});

	test('Dot as extension', () => {
		const dirname = Path.returnExtensionName('/foo/bar/baz/asdf/quux.');

		expect(dirname).toEqual('.');
	});

	test('Double extension', () => {
		const dirname = Path.returnExtensionName(
			'/foo/bar/baz/asdf/quux.tree.js',
		);

		expect(dirname).toEqual('.js');
	});
});

describe('Test for path.parse features', () => {
	test('Parsing path', () => {
		const dirname = Path.parsePath('/foo/bar/baz/asdf/quux.txt');

		expect(dirname).toEqual({
			base: 'quux.txt',
			dir: '/foo/bar/baz/asdf',
			ext: '.txt',
			name: 'quux',
			root: '/',
		});
	});
});

describe('Test for path.normalize features', () => {
	test('Posix path with //', () => {
		const dirname = Path.normalizePath('/foo/bar//baz/asdf/quux.txt');

		expect(dirname).toEqual('/foo/bar/baz/asdf/quux.txt');
	});

	test('Absolute path with //', () => {
		const dirname = Path.normalizePath('C:/foo/bar//baz/asdf/quux.txt');

		expect(dirname).toEqual('C:/foo/bar/baz/asdf/quux.txt');
	});

	test('Absolute path', () => {
		const dirname = Path.normalizePath('C:/foo/bar/baz/asdf/quux.txt');

		expect(dirname).toEqual('C:/foo/bar/baz/asdf/quux.txt');
	});
});

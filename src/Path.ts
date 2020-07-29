import * as path from 'path';

class Path {
	//fixme:
	// static resolvePath(pathToFile: string): string {
	// 	return path.posix.resolve(pathToFile);
	// }

	/**
	 * Implementation of NodeJs dirname.
	 * Returns the directory name of given path.
	 * '/foo/bar/baz/asdf/quux' returns '/foo/bar/baz/asdf'
	 * @param pathToFile - Path to file.
	 */
	static returnDirname(pathToFile: string): string {
		return path.posix.dirname(pathToFile);
	}

	/**
	 * Implementation of NodeJs basename.
	 * Returns file name with extension or without.
	 * '/foo/bar/baz/asdf/quux.html' returns 'quux.html'
	 * '/foo/bar/baz/asdf/quux.html', '.html' returns 'quux'
	 * @param pathToFile - Path to file.
	 * @param extension - Extension to be removed from returned filename (optional).
	 */
	static returnFileName(pathToFile: string, extension?: string): string {
		if (extension != undefined) {
			return path.posix.basename(pathToFile, extension);
		} else {
			return path.posix.basename(pathToFile);
		}
	}

	/**
	 * Implementation of NodeJs extname.
	 * Returns extension from given path.
	 * 'index.html' returns '.html'
	 * 'index.coffee.html' returns '.html'
	 * 'index.' returns '.'
	 * 'index' returns ''
	 * @param pathToFile - Path to file.
	 */
	static returnExtensionName(pathToFile: string): string {
		return path.posix.extname(pathToFile);
	}

	// static joinPath(...partOfPath: Array<string>): string {

	// 	return path.posix.join(pathToFile);
	// }

	/**
	 * Implementation of NodeJs normalize.
	 * Returned path converts '\\' into '/' and resolves '..' and '.'
	 * '/foo/bar//baz/asdf/quux/..' returns '/foo/bar/baz/asdf'
	 * 'C:\\temp\\\\foo\\bar\\..\\' return 'C:/temp/foo/'
	 * @param pathToFile - Path to file.
	 */
	static normalizePath(pathToFile: string): string {
		return path.posix.normalize(pathToFile);
	}

	/**
	 * Implementation of NodeJs parse.
	 * '/home/user/dir/file.txt'
	 * returns
	 * { root: '/',
	 * dir: '/home/user/dir',
	 * base: 'file.txt',
	 * ext: '.txt',
	 * name: 'file' }
	 * @param pathToFile - Path to file.
	 */
	static parsePath(
		pathToFile: string,
	): { root: string; dir: string; base: string; name: string; ext: string } {
		return path.posix.parse(pathToFile);
	}

	/**
	 * Method replacing Windows \\ into Unix /.
	 * @param pathToFile - Path to file.
	 */
	static convertPathToPosix(pathToFile: string): string {
		return pathToFile.replace(/\\/g, '/');
	}

	/**
	 * Method for resolving path, from './file' into 'C:\\file'
	 * @param pathToFile - Path to file.
	 */
	static resolvePath(pathToFile: string): string {
		return this.convertPathToPosix(path.posix.resolve(pathToFile));
	}
}

export default Path;

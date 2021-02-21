import nodePath from 'path';

/**
 * Class for operating on pahts.
 * Every method should use POSIX implementation of nodeJS.
 * Assuming path to file has to have extension, otherwise it's a folder.
 */
class Path {
	/**
	 * Geting folder from path. If path contains extensions, it'a assumed as file and returning failure.
	 * @param path - Path to folder.
	 */
	static getFoler(path: string): { success: boolean; data: string } {
		// if last element has extensions, it's a file
		if (path === '' || this.hasExtension(path)) {
			return { success: false, data: '' };
		} else {
			return { success: true, data: nodePath.posix.basename(path) };
		}
	}

	/**
	 * Geting file from path. If path has no extensions, it'a assumed as folder and returning failure.
	 * @param path - Path to folder.
	 */
	static getFile(path: string): { success: boolean; data: string } {
		// if last element has extensions, it's a file
		if (this.hasExtension(path)) {
			return { success: true, data: nodePath.posix.basename(path) };
		} else {
			return { success: false, data: '' };
		}
	}

	/**
	 * Geting extensions from path. If there is no extenstion method returns failure.
	 * @param path - Path to file.
	 */
	static getExtensions(path: string): { success: boolean; data: string } {
		const extension = nodePath.posix.extname(path);
		//making sure that extension was found
		return { success: extension !== '', data: extension };
	}

	/**
	 * Checking if for given path extenstion is available.
	 * @param path - Path to file.
	 */
	static hasExtension(path: string): boolean {
		return nodePath.posix.extname(path) !== '';
	}

	/**
	 * Converting path to posix slash style path.

	 * @param path - Path.
	 */
	static convertToPosix(path: string): string {
		return path.replaceAll('\\', '/');
	}

	/**
	 * NodeJS prasing path. Allowing to access root, dir, base, extenstion, file name.
	 * C:/path/dir/file.txt returns:
	 * { root: 'C:/',
	 *   dir: 'C:/path/dir',
	 *   base: 'file.txt',
	 *   ext: '.txt',
	 *   name: 'file' }
	 * @param path - Path.
	 */
	static parsePath(path: string): { root: string; dir: string; base: string; ext: string; name: string } {
		return nodePath.posix.parse(path);
	}

	/**
	 * Replacing multiple / separators and resolving . and .. segments.
	 * /foo/bar//baz/asdf/quux/.. returns
	 * /foo/bar/baz/asdf
	 * @param path - Path.
	 */
	static normalizePath(path: string): string {
		return nodePath.posix.normalize(path);
	}
}

export default Path;

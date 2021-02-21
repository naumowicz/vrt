import nodePath from 'path';

/**
 * Every method should use POSIX implementation of nodeJS.
 * Assuming path to file has to have extension, otherwise it's a folder.
 */
class Path {
	getFoler(path: string): { success: boolean; data: string } {
		// if last element has extensions, it's a file
		if (this.hasExtension(path)) {
			return { success:false, data: '' }
		} else {
			return { success: true, data: nodePath.posix.basename(path) }
		}
	}

	getFile(path: string): { success: boolean; data: string }  {
		// if last element has extensions, it's a file
		if (this.hasExtension(path)) {
			return { success: true, data: nodePath.posix.basename(path) }
		} else {
			return { success: false, data: '' }
		}
	}

	getExtensions(path: string): { success: boolean; data: string } {
		const extension = nodePath.posix.extname(path);
		//making sure that extension was found
		return { success: extension !== '', data: extension }
	}

	hasExtension(path: string): boolean {
		return nodePath.posix.extname(path) === '';
	}

	convertToPosix(path: string): string {
		return path.replaceAll('\\', '/');
	}

	parsePath(path: string): {root: string, dir: string, base: string, ext: string, name: string} {
		return nodePath.posix.parse(path);
	}

	normalizePath(path: string): string {
		return nodePath.posix.normalize(path);
	}
}

export default Path;

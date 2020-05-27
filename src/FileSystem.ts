import * as fs from 'fs';
import { promises as fsPromises } from 'fs';
import * as path from 'path';

class Path {
	public static resolvePath(pathToFile: string): string {
		return path.posix.resolve(pathToFile);
	}
}

class FileSystem {
	public async writeFile(pathToFile: string, data: Buffer): Promise<boolean> {
		try {
			await fsPromises.writeFile(Path.resolvePath(pathToFile), data);
		} catch (error) {
			console.log(error);
			return false;
		}
		return true;
	}

	public async readFile(pathToFile: string): Promise<boolean> {
		try {
			await fsPromises.readFile(Path.resolvePath(pathToFile));
		} catch (error) {
			console.log(error);
			return false;
		}
		return true;
	}

	public async checkAvailability(pathToFile: string): Promise<boolean> {
		try {
			await fsPromises.access(
				Path.resolvePath(pathToFile),
				fs.constants.R_OK | fs.constants.W_OK,
			);
		} catch (error) {
			console.log(error);
			return false;
		}
		return true;
	}

	public async deleteFile(pathToFile: string): Promise<boolean> {
		try {
			await fsPromises.unlink(Path.resolvePath(pathToFile));
		} catch (error) {
			console.log(error);
			return false;
		}
		return true;
	}

	public async removeFolderRecursively(
		pathToFolder: string,
	): Promise<boolean> {
		try {
			fsPromises.rmdir(pathToFolder, { recursive: true });
		} catch (error) {
			console.log(error);
			return false;
		}
		return true;
	}

	createReadStream(pathToFile: string): fs.ReadStream {
		return fs.createReadStream(pathToFile);
	}
}

export default FileSystem;

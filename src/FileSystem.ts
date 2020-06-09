import * as fs from 'fs';
import { promises as fsPromises } from 'fs';
import * as path from 'path';

class Path {
	static resolvePath(pathToFile: string): string {
		return path.posix.resolve(pathToFile);
	}
}
// todo: consider static/public methods
class FileSystem {
	async writeFile(pathToFile: string, data: Buffer): Promise<boolean> {
		try {
			await fsPromises.writeFile(Path.resolvePath(pathToFile), data);
		} catch (error) {
			console.log(error);
			return false;
		}
		return true;
	}

	async readFile(pathToFile: string): Promise<boolean> {
		try {
			await fsPromises.readFile(Path.resolvePath(pathToFile));
		} catch (error) {
			console.log(error);
			return false;
		}
		return true;
	}

	async checkAvailability(pathToFile: string): Promise<boolean> {
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

	async deleteFile(pathToFile: string): Promise<boolean> {
		try {
			await fsPromises.unlink(Path.resolvePath(pathToFile));
		} catch (error) {
			console.log(error);
			return false;
		}
		return true;
	}

	async removeFolderRecursively(pathToFolder: string): Promise<boolean> {
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

	async appendToFile(pathToFile: string, data: string): Promise<boolean> {
		try {
			fsPromises.appendFile(pathToFile, data);
		} catch (error) {
			console.log(error);
			return false;
		}
		return true;
	}

	async createFolder(pathToFolder: string): Promise<void> {
		await fsPromises.mkdir(pathToFolder);
	}

	async createFile(pathToFile: string): Promise<void> {
		await fsPromises.open(pathToFile, 'r');
	}
}

export default FileSystem;

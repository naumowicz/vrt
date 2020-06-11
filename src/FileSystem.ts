import * as fs from 'fs';
import { promises as fsPromises } from 'fs';

class FileSystem {
	static async writeFile(pathToFile: string, data: Buffer): Promise<boolean> {
		try {
			await fsPromises.writeFile(pathToFile, data);
		} catch (error) {
			console.log(error);
			return false;
		}
		return true;
	}

	static async readFile(
		pathToFile: string,
	): Promise<{
		status: boolean;
		fileContent: Buffer;
	}> {
		let fileContent: Buffer;
		try {
			fileContent = await fsPromises.readFile(pathToFile);
		} catch (error) {
			console.log(error);
			return { status: false, fileContent: new Buffer('') };
		}
		return { status: true, fileContent: fileContent };
	}

	static async checkAvailability(pathToFile: string): Promise<boolean> {
		try {
			await fsPromises.access(
				pathToFile,
				fs.constants.R_OK | fs.constants.W_OK,
			);
		} catch (error) {
			console.log(error);
			return false;
		}
		return true;
	}

	static async deleteFile(pathToFile: string): Promise<boolean> {
		try {
			await fsPromises.unlink(pathToFile);
		} catch (error) {
			console.log(error);
			return false;
		}
		return true;
	}

	static async removeFolderRecursively(
		pathToFolder: string,
	): Promise<boolean> {
		try {
			await fsPromises.rmdir(pathToFolder, { recursive: true });
		} catch (error) {
			console.log(error);
			return false;
		}
		return true;
	}

	static createReadStream(pathToFile: string): fs.ReadStream {
		return fs.createReadStream(pathToFile);
	}

	static async appendToFile(
		pathToFile: string,
		data: string,
	): Promise<boolean> {
		try {
			await fsPromises.appendFile(pathToFile, data);
		} catch (error) {
			console.log(error);
			return false;
		}
		return true;
	}

	static async createFolder(pathToFolder: string): Promise<void> {
		await fsPromises.mkdir(pathToFolder);
	}

	static async createFile(pathToFile: string): Promise<void> {
		await fsPromises.open(pathToFile, 'r');
	}
}

export default FileSystem;

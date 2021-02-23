import * as fs from 'fs';

/**
 * Class designed for allowing to use methods from fs module with additional try-catching.
 */
class FileSystem {
	/**
	 * Saving buffer to desired file.
	 * @param path - Path to file.
	 * @param data - Buffer to be saved.
	 */
	static async writeFile(path: string, data: Buffer | string): Promise<boolean> {
		//writing file also creates it, so below lines need another method
		// if ((await this.checkAccessToPath(path)) === false) {
		// 	return false;
		// }

		try {
			await fs.promises.writeFile(path, data);
		} catch (error) {
			console.log(error);
			return false;
		}

		return true;
	}

	/**
	 * Reading content of file.
	 * @param path - Path to file.
	 */
	static async readFile(path: string): Promise<{ success: boolean; data: Buffer }> {
		if ((await this.checkAccessToPath(path)) === false) {
			return { success: false, data: Buffer.from('') };
		}

		let fileContent;

		try {
			fileContent = await fs.promises.readFile(path);
		} catch (error) {
			console.log(error);
			return { success: false, data: Buffer.from('') };
		}

		return { success: true, data: fileContent };
	}

	/**
	 * Deleting file.
	 * @param path - Path to file.
	 */
	static async deleteFile(path: string): Promise<boolean> {
		if ((await this.checkAccessToPath(path)) === false) {
			return false;
		}

		try {
			fs.promises.unlink(path);
		} catch (error) {
			console.log(error);
			return false;
		}

		return true;
	}

	/**
	 * Checking if under given path exists file or folder.
	 * @param path - Path to folder or file.
	 */
	static async isFolder(path: string): Promise<{ success: boolean; folder: boolean }> {
		if ((await this.checkAccessToPath(path)) === false) {
			return { success: false, folder: false };
		}

		let isFolder;

		try {
			isFolder = (await fs.promises.lstat(path)).isDirectory();
		} catch (error) {
			console.log(error);
			return { success: false, folder: false };
		}

		return { success: true, folder: isFolder };
	}

	/**
	 * Deleting folder recursively under given path.
	 * Ignoring if it is a file.
	 * @param path - Path to folder.
	 */
	static async deleteFolder(path: string): Promise<boolean> {
		if ((await this.checkAccessToPath(path)) === false) {
			return false;
		}
		const isFolder = await this.isFolder(path);
		if (isFolder.success === false || isFolder.folder === false) {
			return false;
		}

		try {
			await fs.promises.rmdir(path, { recursive: true });
		} catch (error) {
			console.log(error);
			return false;
		}

		return true;
	}

	/**
	 * Creating folder under given path.
	 * @param path Path to folder.
	 */
	static async createFolder(path: string): Promise<boolean> {
		//if folder already exists
		if ((await this.checkAccessToPath(path)) === true) {
			return false;
		}

		try {
			await fs.promises.mkdir(path);
		} catch (error) {
			console.log(error);
			return false;
		}

		return true;
	}

	/**
	 * Checking if there is access to file or folder under given path.
	 * @param path - Path to file or folder.
	 */
	static async checkAccessToPath(path: string): Promise<boolean> {
		try {
			await fs.promises.access(path, fs.constants.R_OK | fs.constants.W_OK);
		} catch (error) {
			console.log(error);
			return false;
		}

		return true;
	}

	/**
	 * Appending data to file under given path.
	 * @param path - Path to file.
	 * @param data - Data to be appended.
	 */
	static async appendToFile(path: string, data: Buffer): Promise<boolean> {
		if ((await this.checkAccessToPath(path)) === false) {
			return false;
		}

		try {
			await fs.promises.appendFile(path, data);
		} catch (error) {
			console.log(error);
			return false;
		}

		return true;
	}

	/**
	 * Creating read stream to file under given path.
	 * @param path - Path to file.
	 */
	static async createReadStream(path: string): Promise<{ success: boolean; readStream: fs.ReadStream | undefined }> {
		if ((await this.checkAccessToPath(path)) === false) {
			return { success: false, readStream: undefined };
		}

		return { success: true, readStream: fs.createReadStream(path) };
	}

	/**
	 * Saving any JavaScript element into JSON file.
	 * @param path - Path to file.
	 * @param data - JavaScript element.
	 */
	static async saveJSONToFile(path: string, data: unknown): Promise<boolean> {
		if ((await this.checkAccessToPath(path)) === false) {
			return false;
		}

		try {
			await fs.promises.writeFile(path, JSON.stringify(data));
		} catch (error) {
			console.log(error);
			return false;
		}

		return true;
	}

	/**
	 * Reading values from JSON file.
	 * @param path - Path to file.
	 */
	static async readJSONFile(path: string): Promise<{ success: boolean; data: Array<string> }> {
		if ((await this.checkAccessToPath(path)) === false) {
			return { success: false, data: [] };
		}

		try {
			const result = await this.readFile(path);
			if (result.success) {
				return { success: true, data: JSON.parse(result.data.toString()) };
			}
		} catch (error) {
			console.log(error);
			return { success: false, data: [] };
		}
	}
}

export default FileSystem;

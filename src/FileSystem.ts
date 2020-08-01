import * as fs from 'fs';

class FileSystem {
	static writeFile(pathToFile: string, data: Buffer): boolean {
		try {
			fs.writeFileSync(pathToFile, data);
		} catch (error) {
			console.log(error);
			return false;
		}
		return true;
	}

	static readFile(
		pathToFile: string,
	): {
		status: boolean;
		fileContent: Buffer;
	} {
		let fileContent: Buffer;
		try {
			fileContent = fs.readFileSync(pathToFile);
		} catch (error) {
			console.log(error);
			return { status: false, fileContent: Buffer.from('') };
		}
		return { status: true, fileContent: fileContent };
	}

	static checkAvailability(pathToFile: string): boolean {
		try {
			fs.accessSync(pathToFile, fs.constants.R_OK | fs.constants.W_OK);
		} catch (error) {
			return false;
		}
		return true;
	}

	static deleteFile(pathToFile: string): boolean {
		try {
			fs.unlinkSync(pathToFile);
		} catch (error) {
			console.log(error);
			return false;
		}
		return true;
	}

	static deleteFolderRecursively(pathToFolder: string): boolean {
		try {
			if (this.checkAvailability(pathToFolder) === false) {
				throw new Error('Folder does not exists');
			}
			fs.rmdirSync(pathToFolder, { recursive: true });
			if (this.checkAvailability(pathToFolder) === true) {
				throw new Error('Folder could not be removed');
			}
		} catch (error) {
			console.log(error);
			return false;
		}
		return true;
	}

	static createReadStream(pathToFile: string): fs.ReadStream {
		return fs.createReadStream(pathToFile);
	}

	static appendToFile(pathToFile: string, data: string): boolean {
		try {
			fs.appendFileSync(pathToFile, data);
		} catch (error) {
			console.log(error);
			return false;
		}
		return true;
	}

	static createFolder(pathToFolder: string): boolean {
		try {
			fs.mkdirSync(pathToFolder);
		} catch (error) {
			console.log(error);
			return false;
		}
		return true;
	}

	static saveJSONToFile(pathToFile: string, data: unknown): boolean {
		try {
			fs.writeFileSync(pathToFile, JSON.stringify(data));
		} catch (error) {
			console.log(error);
			return false;
		}
		return true;
	}

	static readJSONFile(
		pathToFile: string,
	): { status: boolean; fileContent: Array<string> } {
		const rawFile = this.readFile(pathToFile);
		if (rawFile.status) {
			return {
				status: true,
				fileContent: JSON.parse(rawFile.fileContent.toString()),
			};
		} else {
			return { status: false, fileContent: [] };
		}
	}
}

export default FileSystem;

import * as fglob from 'fast-glob';

class FGlob {
	pattern = '**/*.txt';
	pathToFolder: string;
	arrayOfFiles: string[] = [];
	constructor(pathToFolder: string, pattern?: string) {
		this.pathToFolder = pathToFolder;
		if (pattern != undefined) {
			this.pattern = pattern;
		}
	}

	public async getPathsToFiles(): Promise<string[]> {
		return await fglob(`${this.pathToFolder}/${this.pattern}`);
	}
}

export default FGlob;

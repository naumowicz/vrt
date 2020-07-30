// import * as fglob from 'fast-glob';
import fglob = require('fast-glob');

class FGlob {
	pattern = '**/*.txt';

	public async getPathsToFiles(
		pathToFolder: string,
		pattern?: string,
	): Promise<string[]> {
		if (pattern.length >= 2) {
			this.pattern = pattern;
		}
		return await fglob(`${pathToFolder}/${this.pattern}`);
	}
}

export default FGlob;

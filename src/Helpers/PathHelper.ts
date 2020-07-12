import Path from '../Path';
import globalSettings from '../../GlobalSettings';

class PathHelper {
	static getBaselineFolder(pathToBaselineImage: string): string {
		return Path.returnDirname(pathToBaselineImage);
	}

	// static getBaselineImage(pathToBaselineImage) {}

	static getActualStatusFolder(pathToBaselineImage: string): string {
		return Path.normalizePath(
			`${pathToBaselineImage}/../../${globalSettings.actualStatusFolderName}`,
		);
	}

	static getActualStatusImage(pathToBaselineImage: string): string {
		const fileName = Path.parsePath(pathToBaselineImage).base;
		return Path.normalizePath(
			`${pathToBaselineImage}/../../${globalSettings.actualStatusFolderName}/${fileName}`,
		);
	}

	static getOutputImage(pathToBaselineImage: string): string {
		const fileName = Path.parsePath(pathToBaselineImage).base;
		return Path.normalizePath(
			`${pathToBaselineImage}/../../${globalSettings.outputFolderName}/${fileName}`,
		);
	}
}

export default PathHelper;

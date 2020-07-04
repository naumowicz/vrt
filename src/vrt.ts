import Path from './Path';
import FGlob from './FGlob';
import FileSystem from './FileSystem';
import TasksManager from './TasksManager';

(async (): Promise<void> => {
	//array for scenarios to run
	let scenariosToRun = [];
	const tasksFileName = 'tasks.json';
	const fglob = new FGlob();

	//receiving scenarios as path to scenarios
	const passedParameters = process.argv.slice(2);

	//converting Windows path to Unix style
	for (let i = 0; i < passedParameters.length; i++) {
		passedParameters[i] = Path.convertPathToPosix(passedParameters[i]);
	}

	const txtFormatRegex = new RegExp(/\.txt/g);

	for (const scenario of passedParameters) {
		if (txtFormatRegex.test(scenario)) {
			//passed argument is scenario with .txt format
			scenariosToRun.push(scenario);
		} else {
			//passed argument is glob path (all fitting subdirectories)
			scenariosToRun = scenariosToRun.concat(
				fglob.getPathsToFiles(scenario),
			);
		}
	}

	FileSystem.saveJSONToFile(tasksFileName, scenariosToRun);

	const tasksManager = new TasksManager();
})();

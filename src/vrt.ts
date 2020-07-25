import Path from './Path';
import FGlob from './FGlob';
import FileSystem from './FileSystem';
// import TasksManager from './TasksManager';
import globalSettings from '../GlobalSettings';

(async (): Promise<void> => {
	//array for scenarios to run
	let scenariosToRun: Array<string> = [];
	const tasksFileName = globalSettings.tasks;
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
			if (FileSystem.checkAvailability(scenario)) {
				scenariosToRun.push(scenario);
			} else {
				console.log(`${scenario} does not exists!`);
			}
		} else {
			//passed argument is glob path (all fitting subdirectories)
			scenariosToRun = scenariosToRun.concat(
				await fglob.getPathsToFiles(scenario),
			);
		}
	}

	FileSystem.saveJSONToFile(tasksFileName, scenariosToRun);

	// const tasksManager = new TasksManager();
})();

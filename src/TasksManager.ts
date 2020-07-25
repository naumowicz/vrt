import cluster from 'cluster';
import { Worker } from 'worker_threads';
import globalSettings from '../GlobalSettings';
import ScenarioRunner from './ScenarioRunner';
import FileSystem from './FileSystem';

const clusterWorkers: Array<cluster.Worker> = [];

const setUpCluster = (): void => {
	// const numCores = require('os').cpus().length;
	const numCores = globalSettings.numberOfThreads;
	console.log('Master cluster setting up ' + numCores + ' workers');
	const logger = new Worker('./Logger');

	let tasksTakenCounter = 0;

	//load tasks file
	const tasks = FileSystem.readJSONFile(globalSettings.tasks);

	if (tasks.status) {
	} else {
		//todo:
		// return error
	}

	const numberOfTasks = tasks.fileContent.length;

	// iterate on number of cores need to be utilized by an application
	// current example will utilize all of them
	for (let i = 0; i < numCores; i++) {
		// creating workers and pushing reference in an array
		// these references can be used to receive messages from workers
		clusterWorkers.push(cluster.fork());

		if (tasksTakenCounter < numberOfTasks) {
			clusterWorkers[i].send(tasks.fileContent[tasksTakenCounter++]);
		} else {
			//todo:
			//finish? kill?
		}

		// to receive messages from worker process
		// clusterWorkers[i].on('message', function (message) {
		// console.log(message);
		// });
	}

	// process is clustered on a core and process id is assigned
	cluster.on('online', function (clusterWorker) {
		console.log('Worker ' + clusterWorker.process.pid + ' is listening');
	});

	// if any of the worker process dies then start a new one by simply forking another one
	cluster.on('exit', function (worker, code, signal) {
		console.log(
			'Worker ' +
				worker.process.pid +
				' died with code: ' +
				code +
				', and signal: ' +
				signal,
		);
		console.log('Starting a new worker');
		cluster.fork();
		clusterWorkers.push(cluster.fork());
		// to receive messages from worker process
		clusterWorkers[this.clusterWorkers.length - 1].on('message', function (
			message,
		) {
			logger.postMessage(message);
			// console.log(message);
		});
	});
};

const startVRT = async (): Promise<void> => {
	//fixme:
	const scenarioRunner = new ScenarioRunner('');
	if (scenarioRunner.loadScenarios()) {
		await scenarioRunner.runScenarios();
	} else {
		return;
	}
};

const run = async (): Promise<void> => {
	// if it is a master process then call setting up worker process
	if (cluster.isMaster) {
		setUpCluster();
	} else {
		// to setup server configurations and share port address for incoming requests
		startVRT();
	}
};

await run();

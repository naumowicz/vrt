import cluster, { worker as workerFromCluster } from 'cluster';
import { Worker } from 'worker_threads';
import globalSettings from '../GlobalSettings';
import ScenarioRunner from './ScenarioRunner';
import FileSystem from './FileSystem';

class TasksManager {
	clusterWorkers: Array<cluster.Worker>;
	tasks: { status: boolean; fileContent: Array<string> };
	numberOfTasks: number;
	tasksTakenCounter: number;
	constructor() {
		this.clusterWorkers = [];

		//load tasks file
		this.tasks = FileSystem.readJSONFile(globalSettings.tasks);

		//tasks loaded properly
		if (this.tasks.status) {
			this.numberOfTasks = this.tasks.fileContent.length;
			this.tasksTakenCounter = 0;
		} else {
			//todo:
			// return error
		}
	}

	setUpCluster(): void {
		// const numCores = require('os').cpus().length;
		const numCores = globalSettings.numberOfThreads;
		//fixme: debug loger
		console.log('Master cluster setting up ' + numCores + ' workers');
		//todo: fix me
		// const logger = new Worker('./Logger.js');

		let i = 0;

		// iterate on number of cores need to be utilized by an application
		// current example will utilize all of them
		for (i = 0; i < numCores; i++) {
			// creating workers and pushing reference in an array
			// these references can be used to receive messages from workers

			this.startNewClusterWorker(i);

			// to receive messages from worker process
			// clusterWorkers[i].on('message', function (message) {
			// console.log(message);
			// });
		}

		// process is clustered on a core and process id is assigned
		cluster.on('online', (clusterWorker) => {
			//fixme: debug loger
			// this.sendTaskToWorker(
			// this.tasks.fileContent[this.tasksTakenCounter],
			// );
			console.log(
				'Worker ' + clusterWorker.process.pid + ' is listening',
			);
		});

		// if any of the worker process dies then start a new one by simply forking another one
		cluster.on('exit', (worker, code, signal) => {
			//fixme: debug loger
			console.log(
				'Worker ' +
					worker.process.pid +
					' died with code: ' +
					code +
					', and signal: ' +
					signal,
			);

			this.startNewClusterWorker(i);
		});
	}

	startNewClusterWorker(i: number): void {
		if (this.tasksTakenCounter < this.numberOfTasks) {
			//fixme: debug loger
			console.log('Starting a new worker');
			this.clusterWorkers.push(cluster.fork());
			// this.clusterWorkers[i].send(
			// 	this.tasks.fileContent[this.tasksTakenCounter],
			// );
			// //fixme: debug loger
			// console.log(
			// 	`Master sent task: ${
			// 		this.tasks.fileContent[this.tasksTakenCounter]
			// 	} to ${this.clusterWorkers[i].process.pid}`,
			// );
			// this.tasksTakenCounter++;
		}
	}

	sendTaskToWorker(i: number): void {
		// this.clusterWorkers.p
		this.clusterWorkers[i].send(
			this.tasks.fileContent[this.tasksTakenCounter],
		);
		//fixme: debug loger
		console.log(
			`Master sent task: ${
				this.tasks.fileContent[this.tasksTakenCounter]
			} to ${this.clusterWorkers[i].process.pid}`,
		);
		this.tasksTakenCounter++;
	}

	async startVRT(): Promise<void> {
		process.on('message', async (receivedTask) => {
			//fixme: debug loger
			console.log(
				`Worker ${workerFromCluster.process.pid} received task ${receivedTask}`,
			);
			const scenarioRunner = new ScenarioRunner(receivedTask);
			if (await scenarioRunner.loadScenarios()) {
				await scenarioRunner.runScenarios();
			} else {
				process.exit(-1);
			}
			process.exit(1);
		});
	}

	async run(): Promise<void> {
		// if it is a master process then call setting up worker process
		if (cluster.isMaster) {
			this.setUpCluster();
		} else {
			// to setup server configurations and share port address for incoming requests
			await this.startVRT();
		}
	}
}

export default TasksManager;

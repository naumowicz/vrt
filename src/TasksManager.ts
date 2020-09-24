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

		if (this.tasks.status) {
			//tasks loaded properly
			this.numberOfTasks = this.tasks.fileContent.length;
			this.tasksTakenCounter = 0;
		} else {
			// todo:
			// report error
		}
	}

	setUpCluster(): void {
		const numberOfThreads = globalSettings.numberOfThreads;

		console.log(`Master cluster setting up ${numberOfThreads} workers`);

		let nthWorker = 0;

		for (nthWorker; nthWorker < numberOfThreads; nthWorker++) {
			this.startNewClusterWorker();
		}

		cluster.on('fork', (clusterWorker) => {
			console.log(
				`Worker ${clusterWorker.process.pid} started it's life!`,
			);
		});

		cluster.on('message', (clusterWorker, message) => {
			if (message !== 'ready') {
				return;
			}

			const nthWorker = this.getNthWorkerByPid(clusterWorker.process.pid);

			if (nthWorker === -1) {
				console.log('Error when receiving worker index');
			}

			// change 5 to decide about maximum available delay
			const delay = (nthWorker % 5) * 1000;

			setTimeout(() => {
				this.sendNextTaskToNthWorker(nthWorker);
			}, delay);
		});

		cluster.on('exit', (worker, code, signal) => {
			if (signal) {
				console.log(
					`worker ${worker.process.pid} was killed by signal: ${signal}`,
				);
			} else if (code !== 0) {
				console.log(
					`worker ${worker.process.pid} exited with error code: ${code}`,
				);
			} else {
				console.log(
					`Worker ${worker.process.pid} finished task successfully!`,
				);
			}
			if (this.tasksTakenCounter < this.numberOfTasks) {
				this.startNewClusterWorker();
			}
		});
	}

	startNewClusterWorker(): void {
		//creating new workers as long as tasks are available
		if (this.tasksTakenCounter < this.numberOfTasks) {
			console.log('Starting new worker');
			this.clusterWorkers.push(cluster.fork());
			// incrementing tasksTakenCounter to fix issue, where last task was not assigned yet but last + 1 worker was created
			this.tasksTakenCounter++;
		}
	}

	sendNextTaskToNthWorker(nthWorker: number): void {
		this.clusterWorkers[nthWorker].send(this.tasks.fileContent[nthWorker]);

		console.log(
			`Master sent task: ${this.tasks.fileContent[nthWorker]} to ${this.clusterWorkers[nthWorker].process.pid}`,
		);
	}

	getNthWorkerByPid(pid: number): number {
		const checkIfWorkerHasPid = (worker: cluster.Worker): boolean => {
			return worker.process.pid === pid;
		};
		return this.clusterWorkers.findIndex(checkIfWorkerHasPid);
	}

	async startVRT(): Promise<void> {
		process.send('ready');
		process.on('message', async (receivedTask) => {
			//fixme: debug loger
			console.log(
				`Worker ${workerFromCluster.process.pid} received task ${receivedTask}`,
			);
			const scenarioRunner = new ScenarioRunner(receivedTask);
			if (await scenarioRunner.loadScenarios()) {
				await scenarioRunner.runScenarios();
			} else {
				//here something gone wrong
				process.exit(-1);
			}
			//task finished successfully
			process.exit(0);
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

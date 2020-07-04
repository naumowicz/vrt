import cluster from 'cluster';
import { Worker } from 'worker_threads';

class TasksManager {
	logger: Worker;
	spawnLogger(): void {
		this.logger = new Worker('./Logger');
	}

	closeLogger(): void {
		this.logger.unref();
	}

	sendLog(type: string, message: string): void {
		this.logger.postMessage({ type, message });
	}
}

export default TasksManager;

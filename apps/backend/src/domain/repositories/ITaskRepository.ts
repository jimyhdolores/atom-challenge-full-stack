import { Task } from '../entities/Task';

export interface ITaskRepository {
	findAll(userId: string): Promise<Task[]>;
	findById(id: string): Promise<Task | null>;
	create(task: Task): Promise<Task>;
	update(id: string, task: Partial<Task>): Promise<Task>;
	delete(id: string): Promise<void>;
}

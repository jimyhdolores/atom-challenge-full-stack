import { Task } from '../../domain/entities/Task';
import { ITaskRepository } from '../../domain/repositories/ITaskRepository';
import { CreateTaskDTO, UpdateTaskDTO } from '../dtos/TaskDTO';

export class TaskService {
	constructor(private taskRepository: ITaskRepository) {}

	async getAllTasks(userId: string): Promise<Task[]> {
		return this.taskRepository.findAll(userId);
	}

	async createTask(taskDto: CreateTaskDTO): Promise<Task> {
		const task: Task = {
			...taskDto,
			completed: false,
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		return this.taskRepository.create(task);
	}

	async updateTask(id: string, taskDto: UpdateTaskDTO): Promise<Task> {
		const task = await this.taskRepository.findById(id);
		if (!task) throw new Error('Task not found');

		return this.taskRepository.update(id, {
			...taskDto,
			updatedAt: new Date(),
		});
	}

	async deleteTask(id: string): Promise<void> {
		await this.taskRepository.delete(id);
	}
}

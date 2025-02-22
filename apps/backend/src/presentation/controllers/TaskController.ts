import { Request, Response } from 'express';
import { CreateTaskDTO, UpdateTaskDTO } from '../../application/dtos/TaskDTO';
import { TaskService } from '../../application/services/TaskService';

export class TaskController {
	constructor(private taskService: TaskService) {}

	async getTasks(req: Request, res: Response) {
		try {
			const userId = req.params.userId;
			const tasks = await this.taskService.getAllTasks(userId);
			res.json(tasks);
		} catch (error) {
			res.status(500).json({ error: 'Error fetching tasks' });
		}
	}

	async createTask(req: Request, res: Response) {
		try {
			const taskDto: CreateTaskDTO = req.body;
			const task = await this.taskService.createTask(taskDto);
			res.status(201).json(task);
		} catch (error) {
			res.status(500).json({ error: 'Error creating task' });
		}
	}

	async updateTask(req: Request, res: Response) {
		try {
			const taskId = req.params.taskId;
			const taskDto: UpdateTaskDTO = req.body;
			const task = await this.taskService.updateTask(taskId, taskDto);
			res.json(task);
		} catch (error) {
			res.status(500).json({ error: 'Error updating task' });
		}
	}

	async deleteTask(req: Request, res: Response) {
		try {
			const taskId = req.params.taskId;
			await this.taskService.deleteTask(taskId);
			res.status(204).send();
		} catch (error) {
			res.status(500).json({ error: 'Error deleting task' });
		}
	}
}

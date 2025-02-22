import { Router } from 'express';
import { body } from 'express-validator';
import { TaskService } from '../../application/services/TaskService';
import { FirebaseTaskRepository } from '../../infrastructure/repositories/FirebaseTaskRepository';
import { TaskController } from '../controllers/TaskController';
import { validate } from '../middlewares/validation';

const router = Router();
const taskRepository = new FirebaseTaskRepository();
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService);

// Validaciones
const createTaskValidation = [
	body('title').notEmpty().trim(),
	body('description').notEmpty().trim(),
	body('userId').notEmpty(),
	validate,
];

const updateTaskValidation = [
	body('title').optional().trim(),
	body('description').optional().trim(),
	body('completed').optional().isBoolean(),
	validate,
];

// Rutas
router.get('/:userId', taskController.getTasks.bind(taskController));
router.post('/', createTaskValidation, taskController.createTask.bind(taskController));
router.put('/:taskId', updateTaskValidation, taskController.updateTask.bind(taskController));
router.patch('/:taskId', updateTaskValidation, taskController.updateTask.bind(taskController));
router.delete('/:taskId', taskController.deleteTask.bind(taskController));

export { router as taskRoutes };

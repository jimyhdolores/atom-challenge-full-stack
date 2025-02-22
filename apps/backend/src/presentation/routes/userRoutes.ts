import { Router } from 'express';
import { body } from 'express-validator';
import { UserService } from '../../application/services/UserService';
import { FirebaseUserRepository } from '../../infrastructure/repositories/FirebaseUserRepository';
import { UserController } from '../controllers/UserController';
import { validate } from '../middlewares/validation';

const router = Router();
const userRepository = new FirebaseUserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

// Validaciones
const createUserValidation = [body('email').isEmail(), validate];
const loginValidation = [body('email').isEmail(), validate];

// Rutas
router.get('/:email', userController.getUserByEmail.bind(userController));
router.post('/', createUserValidation, userController.createUser.bind(userController));
router.post('/login', loginValidation, userController.login.bind(userController));

export { router as userRoutes };

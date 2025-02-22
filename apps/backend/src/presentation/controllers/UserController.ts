import { Request, Response } from 'express';
import { CreateUserDTO, LoginUserDTO } from '../../application/dtos/UserDTO';
import { UserService } from '../../application/services/UserService';

export class UserController {
	constructor(private userService: UserService) {}

	async getUserByEmail(req: Request, res: Response) {
		try {
			const email = req.params.email;
			const user = await this.userService.findByEmail(email);
			if (!user) {
				return res.status(404).json({ error: 'User not found' });
			}
			res.json(user);
		} catch (error) {
			res.status(500).json({ error: 'Error fetching user' });
		}
	}

	async createUser(req: Request, res: Response) {
		try {
			const userDto: CreateUserDTO = req.body;
			const user = await this.userService.createUser(userDto);
			res.status(201).json(user);
		} catch (error: any) {
			if (error.message === 'User already exists') {
				return res.status(400).json({ error: error.message });
			}
			res.status(500).json({ error: 'Error creating user' });
		}
	}

	async login(req: Request, res: Response) {
		try {
			const loginDto: LoginUserDTO = req.body;
			const user = await this.userService.login(loginDto);
			res.json(user);
		} catch (error: any) {
			if (error.message === 'Invalid credentials') {
				return res.status(401).json({ error: error.message });
			}
			res.status(500).json({ error: 'Error during login' });
		}
	}
}

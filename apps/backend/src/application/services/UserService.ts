import jwt from 'jsonwebtoken';
import { User } from '../../domain/entities/User';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { CreateUserDTO, LoginUserDTO, UserResponseDTO } from '../dtos/UserDTO';

export class UserService {
	constructor(private userRepository: IUserRepository) {}

	private generateToken(userId: string): string {
		return jwt.sign({ userId }, process.env.JWT_SECRET || 'your-secret-key', {
			expiresIn: '24h',
		});
	}

	private mapToUserResponse(user: User, token?: string): UserResponseDTO {
		return {
			id: user.id!,
			email: user.email,
			createdAt: user.createdAt,
			token,
		};
	}

	async findByEmail(email: string): Promise<UserResponseDTO | null> {
		const user = await this.userRepository.findByEmail(email);
		return user ? this.mapToUserResponse(user) : null;
	}

	async createUser(userDto: CreateUserDTO): Promise<UserResponseDTO> {
		const existingUser = await this.userRepository.findByEmail(userDto.email);
		if (existingUser) {
			throw new Error('User already exists');
		}

		const user = await this.userRepository.create({
			...userDto,
			createdAt: new Date(),
		});

		const token = this.generateToken(user.id!);
		return this.mapToUserResponse(user, token);
	}

	async login(loginDto: LoginUserDTO): Promise<UserResponseDTO> {
		const user = await this.userRepository.findByEmail(loginDto.email);
		if (!user) {
			throw new Error('Invalid credentials');
		}

		const token = this.generateToken(user.id!);
		return this.mapToUserResponse(user, token);
	}
}

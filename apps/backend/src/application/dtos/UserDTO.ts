export interface CreateUserDTO {
	email: string;
}

export interface LoginUserDTO {
	email: string;
}

export interface UserResponseDTO {
	id: string;
	email: string;
	createdAt: Date;
	token?: string;
}

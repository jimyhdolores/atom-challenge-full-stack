export interface User {
	id: string;
	email: string;
	createdAt: Date;
	token?: string;
}

export interface CreateUserDTO {
	email: string;
}

export interface LoginUserDTO {
	email: string;
}

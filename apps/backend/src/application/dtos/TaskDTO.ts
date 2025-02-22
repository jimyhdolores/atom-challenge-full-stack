export interface CreateTaskDTO {
	title: string;
	description: string;
	userId: string;
}

export interface UpdateTaskDTO {
	title?: string;
	description?: string;
	completed?: boolean;
}

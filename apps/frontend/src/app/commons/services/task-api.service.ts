import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CreateTaskDTO, Task, UpdateTaskDTO } from '../models/task.model';

@Injectable({
	providedIn: 'root',
})
export class TaskApiService {
	private http = inject(HttpClient);

	getTasks(userId: string): Observable<Task[]> {
		return this.http.get<Task[]>(`${environment.apiUrl}/tasks/${userId}`);
	}

	createTask(task: CreateTaskDTO): Observable<Task> {
		return this.http.post<Task>(`${environment.apiUrl}/tasks`, task);
	}

	updateTask(taskId: string, task: UpdateTaskDTO): Observable<Task> {
		return this.http.patch<Task>(`${environment.apiUrl}/tasks/${taskId}`, task);
	}

	deleteTask(taskId: string): Observable<void> {
		return this.http.delete<void>(`${environment.apiUrl}/tasks/${taskId}`);
	}
}

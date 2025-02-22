import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../../commons/components/confirm-dialog/confirm-dialog.component';
import { Task } from '../../commons/models/task.model';
import { AuthService } from '../../commons/services/auth.service';
import { LoaderService } from '../../commons/services/loader.service';
import { TaskApiService } from '../../commons/services/task-api.service';
import { TaskFormComponent } from './task-form/task-form.component';

@Component({
	selector: 'app-task-list',
	imports: [MatCardModule, MatCheckboxModule, MatButtonModule, MatIconModule, DatePipe, AsyncPipe],
	templateUrl: './task-page.component.html',
	styleUrls: ['./task-page.component.scss'],
})
export default class TaskListComponent implements OnInit {
	private readonly _taskService = inject(TaskApiService);
	private readonly _authService = inject(AuthService);
	private readonly _dialog = inject(MatDialog);
	private readonly _router = inject(Router);
	private readonly _loaderService = inject(LoaderService);

	currentUser$ = this._authService.currentUser$;
	tasks: Task[] = [];

	ngOnInit() {
		this._loadTasks();
	}

	private _loadTasks() {
		const userId = this._authService.getCurrentUser()?.id;
		if (userId) {
			this._taskService.getTasks(userId).subscribe({
				next: (tasks) =>
					(this.tasks = tasks.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())),
				error: (error) => console.error('Error loading tasks:', error),
			});
		}
	}

	openTaskForm(task?: Task) {
		const dialogRef = this._dialog.open(TaskFormComponent, {
			width: '500px',
			data: task,
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this._loadTasks();
			}
		});
	}

	toggleTaskStatus(task: Task) {
		this._taskService.updateTask(task.id!, { completed: !task.completed }).subscribe({
			next: () => this._loadTasks(),
			error: (error) => console.error('Error updating task:', error),
		});
	}

	editTask(task: Task) {
		this.openTaskForm(task);
	}

	deleteTask(task: Task) {
		const dialogRef = this._dialog.open(ConfirmDialogComponent, {
			width: '300px',
			data: {
				title: 'Confirmar eliminación',
				message: '¿Está seguro de eliminar esta tarea?',
				confirmText: 'Eliminar',
				cancelText: 'Cancelar',
			},
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this._loaderService.show();
				this._taskService.deleteTask(task.id!).subscribe({
					next: () => {
						this._loadTasks();
						this._loaderService.hide();
					},
					error: (error) => {
						this._loaderService.hide();
						console.error('Error deleting task:', error);
					},
				});
			}
		});
	}

	logout() {
		this._authService.logout();
		this._router.navigate(['/login']);
	}
}

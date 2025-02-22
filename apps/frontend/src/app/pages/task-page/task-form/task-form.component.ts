import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Task } from '../../../commons/models/task.model';
import { AuthService } from '../../../commons/services/auth.service';
import { LoaderService } from '../../../commons/services/loader.service';
import { TaskApiService } from '../../../commons/services/task-api.service';

interface TaskForm {
	title: string;
	description: string;
}

@Component({
	selector: 'app-task-form',
	imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule],
	templateUrl: './task-form.component.html',
	styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent {
	private readonly _fb = inject(NonNullableFormBuilder);
	private readonly _taskService = inject(TaskApiService);
	private readonly _authService = inject(AuthService);
	private readonly _dialogRef = inject(MatDialogRef<TaskFormComponent>);
	private readonly _loaderService = inject(LoaderService);

	data = inject(MAT_DIALOG_DATA) as Task | null;

	taskForm = this._fb.group({
		title: ['', Validators.required],
		description: ['', Validators.required],
	});

	private readonly ERROR_MESSAGES = {
		NO_USER: 'No user ID found',
		UPDATE_ERROR: 'Error updating task:',
		CREATE_ERROR: 'Error creating task:',
	} as const;

	constructor() {
		if (this.data) {
			this.taskForm.patchValue({
				title: this.data.title,
				description: this.data.description,
			});
		}
	}

	onSubmit(): void {
		if (this.taskForm.invalid) return;

		const userId = this._authService.getCurrentUser()?.id;
		if (!userId) {
			console.error(this.ERROR_MESSAGES.NO_USER);
			return;
		}

		const formValue = this.taskForm.getRawValue();

		this.data ? this.updateTask(formValue) : this.createTask(formValue, userId);
	}

	private updateTask(formValue: TaskForm): void {
		this._loaderService.show();
		this._taskService.updateTask(this.data!.id!, formValue).subscribe({
			next: () => this.handleSuccess(),
			error: (error) => this.handleError(this.ERROR_MESSAGES.UPDATE_ERROR, error),
		});
	}

	private createTask(formValue: TaskForm, userId: string): void {
		this._loaderService.show();
		this._taskService.createTask({ ...formValue, userId }).subscribe({
			next: () => this.handleSuccess(),
			error: (error) => this.handleError(this.ERROR_MESSAGES.CREATE_ERROR, error),
		});
	}

	private handleSuccess(): void {
		this._loaderService.hide();
		this._dialogRef.close(true);
	}

	private handleError(message: string, error: any): void {
		this._loaderService.hide();
		console.error(message, error);
	}
}

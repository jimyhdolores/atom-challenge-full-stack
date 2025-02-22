import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

export interface ConfirmDialogData {
	title: string;
	message: string;
	confirmText?: string;
	cancelText?: string;
}

@Component({
	selector: 'app-confirm-dialog',
	imports: [MatDialogModule, MatButtonModule],
	template: `
		<h2 mat-dialog-title>{{ data.title }}</h2>
		<mat-dialog-content>
			<p>{{ data.message }}</p>
		</mat-dialog-content>
		<mat-dialog-actions align="end">
			<button mat-button mat-dialog-close>{{ data.cancelText || 'Cancelar' }}</button>
			<button mat-button color="warn" [mat-dialog-close]="true">{{ data.confirmText || 'Confirmar' }}</button>
		</mat-dialog-actions>
	`,
})
export class ConfirmDialogComponent {
	constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData) {}
}

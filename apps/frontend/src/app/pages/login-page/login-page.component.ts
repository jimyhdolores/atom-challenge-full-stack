import { Component, inject } from '@angular/core';
import {
	AbstractControl,
	NonNullableFormBuilder,
	ReactiveFormsModule,
	ValidationErrors,
	Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { ConfirmDialogComponent } from '../../commons/components/confirm-dialog/confirm-dialog.component';
import { AuthService } from '../../commons/services/auth.service';
import { LoaderService } from '../../commons/services/loader.service';

@Component({
	selector: 'app-login',
	imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule, MatCardModule],
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.scss'],
})
export default class LoginComponent {
	private readonly _fb = inject(NonNullableFormBuilder);
	private readonly _authService = inject(AuthService);
	private readonly _router = inject(Router);
	private readonly _dialog = inject(MatDialog);
	private readonly _loaderService = inject(LoaderService);

	private emailValidator(control: AbstractControl): ValidationErrors | null {
		const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		const valid = emailRegex.test(control.value);
		return valid ? null : { invalidEmail: true };
	}

	readonly loginForm = this._fb.group({
		email: ['', [Validators.required, this.emailValidator]],
	});

	private _handleError(error: any) {
		this._loaderService.hide();
		if (error.status === 401) {
			return this._handleUnauthorizedUser();
		}
		console.error('Error during login:', error);
		return EMPTY;
	}

	private _handleUnauthorizedUser() {
		const dialogRef = this._dialog.open(ConfirmDialogComponent, {
			width: '400px',
			data: {
				title: 'Usuario no registrado',
				message: '¿Desea registrarse con este correo electrónico?',
				confirmText: 'Registrarme',
				cancelText: 'Cancelar',
			},
			disableClose: true,
			autoFocus: false,
			role: 'dialog',
		});

		return dialogRef.afterClosed().pipe(
			switchMap((result) => {
				if (!result) return EMPTY;

				this._loaderService.show();
				return this._authService.createUser(this.loginForm.controls.email.value).pipe(
					tap({
						next: () => this._navigateToTasks(),
						error: (error) => {
							this._loaderService.hide();
							console.error('Error creating user:', error);
						},
					})
				);
			})
		);
	}

	private _navigateToTasks(): void {
		this._loaderService.hide();
		this._router.navigate(['/tasks']);
	}

	onSubmit(): void {
		if (this.loginForm.invalid) return;

		const { email } = this.loginForm.value;
		this._loaderService.show();

		this._authService
			.login({ email: email! })
			.pipe(
				tap(() => this._navigateToTasks()),
				catchError((error) => this._handleError(error))
			)
			.subscribe();
	}
}

import { Routes } from '@angular/router';
import { authGuard } from './commons/guards/auth.guard';

export const routes: Routes = [
	{
		path: 'login',
		loadComponent: () => import('./pages/login-page/login-page.component'),
	},
	{
		path: 'tasks',
		loadComponent: () => import('./pages/task-page/task-page.component'),
		canActivate: [authGuard],
	},
	{ path: '', redirectTo: '/login', pathMatch: 'full' },
	{ path: '**', redirectTo: '/login' },
];

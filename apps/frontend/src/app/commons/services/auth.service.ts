import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginUserDTO, User } from '../models/user.model';
import { AuthApiService } from './auth-api.service';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private currentUserSubject = new BehaviorSubject<User | null>(null);
	currentUser$ = this.currentUserSubject.asObservable();

	constructor(private authApiService: AuthApiService) {
		const storedUser = localStorage.getItem('currentUser');
		if (storedUser) {
			this.currentUserSubject.next(JSON.parse(storedUser));
		}
	}

	getCurrentUser(): User | null {
		return this.currentUserSubject.value;
	}

	login(credentials: LoginUserDTO): Observable<User> {
		return this.authApiService.login(credentials).pipe(tap((user) => this.setCurrentUser(user)));
	}

	createUser(email: string): Observable<User> {
		return this.authApiService.createUser(email).pipe(tap((user) => this.setCurrentUser(user)));
	}

	private setCurrentUser(user: User): void {
		localStorage.setItem('currentUser', JSON.stringify(user));
		this.currentUserSubject.next(user);
	}

	logout(): void {
		localStorage.removeItem('currentUser');
		this.currentUserSubject.next(null);
	}
}

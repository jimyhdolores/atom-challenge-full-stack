import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { CreateUserDTO, LoginUserDTO, User } from '../models/user.model';

@Injectable({
	providedIn: 'root',
})
export class AuthApiService {
	private http = inject(HttpClient);

	getUserByEmail(email: string): Observable<User> {
		return this.http.get<User>(`${environment.apiUrl}/users/${email}`);
	}

	login(credentials: LoginUserDTO): Observable<User> {
		return this.http.post<User>(`${environment.apiUrl}/users/login`, credentials);
	}

	createUser(email: string): Observable<User> {
		const userDto: CreateUserDTO = { email };
		return this.http.post<User>(`${environment.apiUrl}/users`, userDto);
	}
}

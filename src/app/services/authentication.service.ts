import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../models/user';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
  
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/auth/signin`, { username, password }, httpOptions)
            .pipe(map(user => {
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.userSubject.next(null);
        this.router.navigate(['/login']);
    }
}

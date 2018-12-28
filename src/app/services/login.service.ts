import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgxPermissionsService } from 'ngx-permissions';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class LoginService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient,private permissionsService: NgxPermissionsService) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

 

    login(username: string, password: string) {
        return this.http.post<any>('/users/authenticate', { username, password })
            .pipe(map(user => {
                if (user){
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.permissionsService.addPermission(user.role);
                    
                    this.currentUserSubject.next(user);
                }
                return user;
            }));
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
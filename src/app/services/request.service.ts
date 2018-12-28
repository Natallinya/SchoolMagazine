import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class RequestService {
    constructor(private http: HttpClient) { }



    register(user: User) {
        return this.http.post('/users/register', user);
    }

   
}
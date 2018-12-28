import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

@Injectable()
export class RegisterBackend implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 
        let users: any[] = JSON.parse(localStorage.getItem('users')) || [];


        return of(null).pipe(mergeMap(() => {


            if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {

                let filteredUsers = users.filter(user => {
                    return user.username === request.body.username && user.password === request.body.password;
                });

                if (filteredUsers.length) {

                    let user = filteredUsers[0];
                    let body = {
                        id: user.id,
                        username: user.username,
                        role: user.roles
                    };
                    console.log(user);
                    return of(new HttpResponse({ status: 200, body: body }));
                } else {

                    return throwError({ error: { message: 'Логин или пароль неверные!' } });
                }
            }


            if (request.url.endsWith('/users/register') && request.method === 'POST') {
   
                let newUser = request.body;
               
  
                newUser.id = users.length + 1;
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));

                return of(new HttpResponse({ status: 200 }));
            }




            return next.handle(request);
            
        }))


        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());
    }
}

export let registerBackend = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: RegisterBackend,
    multi: true
};
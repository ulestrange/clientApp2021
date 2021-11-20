

   
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { UserService } from '../user.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private userService: UserService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if account is logged in and request is to the api url
        const user = this.userService.userValue;
        console.table(user);
       // const isLoggedIn = user?.appToken;


        const isLoggedIn = localStorage.getItem('access_token');
        console.log('is logged in ' + isLoggedIn);
       // const isApiUrl = request.url.startsWith('environment.apiUrl');
       const isApiUrl = true;
        console.log('is api Url ' + isApiUrl);

        console.log(`Bearer ${isLoggedIn}`);

        if (isLoggedIn && isApiUrl) {
            console.log ('here');
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${isLoggedIn}` }
            });

        }


        return next.handle(request);
    }
}

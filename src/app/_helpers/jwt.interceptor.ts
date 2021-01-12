import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../_services/';
const apiUrl = 'http://server1.raindesigner.com/v1/api/';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const currentUser = this.authenticationService.currentUserValue;
        const isLoggedIn = currentUser && currentUser.token;
        const isApiUrl = request.url.startsWith(apiUrl);
        if (isLoggedIn) {            
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                },
                url: `http://server1.raindesigner.com/v1/api/${request.url}`
            });
        }

        return next.handle(request);
    }
}
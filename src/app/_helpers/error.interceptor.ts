import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService, NotificationService } from '../_services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
	constructor(
		private authenticationService: AuthenticationService,
		private notificationService: NotificationService,
		private location: Location
	) {}

	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		return next.handle(request).pipe(
			catchError((err) => {
				if (err.status === 401) {
					// auto logout if 401 response returned from api
					this.authenticationService.logout();
					location.reload();
				}

				if (err.status === 403) {
					this.notificationService.sendMessages(
						"You don't have permission to do this actions",
						'error',
						true,
						{ text: 'Ok' }
					);
					setTimeout(() => {
						this.location.back();
					}, 3000);
				} else {
					// console.log(err.statusText);
					this.notificationService.sendMessages(err.statusText, 'error', true, {
						text: 'Ok',
					});
				}

				//const error = err.error || err.statusText;
				return throwError(err);
			})
		);
	}
}

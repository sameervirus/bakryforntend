import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { AuthenticationService, LoaderService, NotificationService } from '../_services/';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	
	login = {username:'admin', password:'admin'}
  user:any;
  constructor(
  	private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    private loaderService: LoaderService,
  	private authenticationService: AuthenticationService
  	) { }

  ngOnInit(): void {

  }

  onSubmit() {
  	this.loaderService.display(true);
  	this.authenticationService.login(this.login.username, this.login.password)
      .pipe(first())
      .subscribe({
          next: () => {
              let direction = '/';
              this.user = (JSON.parse(localStorage.getItem('currentUser')!)).user;
              if (this.user) {
                if(this.user.client == 0) {
                  if(this.user.permissions.includes('review orders')) {
                    direction = '/orders/reviews';
                  } else {
                    direction = '/coding';
                  }
                } else {
                  if(this.user.permissions.includes('orders')) {
                    direction = '/orders/actives';
                  } else {
                    direction = '/users';
                  }
                }
              }
          		this.loaderService.display(false);
              // get return url from route parameters or default to '/'
              const returnUrl = this.route.snapshot.queryParams['returnUrl'] || direction;
              this.router.navigate([returnUrl]);
              this.notificationService.sendMessages(
                `You're logged in!`,
                'success', 
                true, 
                {'text':'Ok'}, 
              );
          },
          error: error => {
          	this.loaderService.display(false);
            this.notificationService.sendMessages(
              'Bad username or password please try again',
              'error', 
              true, 
              {'text':'Ok'}, 
            );
            
          }
      });
  }

}

import { Component, Renderer2 } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { LoaderService } from './_services';

@Component({
  selector: '[id=app]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Forntend';

  hideElement = false;
  loading = false;
  constructor(
  	private render:Renderer2, 
  	private router: Router,
  	private loaderService: LoaderService
  	) {
	  this.router.events.subscribe((event) => {
	    if (event instanceof NavigationEnd) {
	      if (event.url.indexOf('login') !== -1) {
	        this.hideElement = true;
	        this.render.removeClass(document.body,"sidebar-mini");
	        this.render.addClass(document.body,"login-page");
	      }  else {
	        this.hideElement = false;
	        this.render.removeClass(document.body,"login-page");
	        this.render.addClass(document.body,"sidebar-mini");
	      }
	    }
	  });
	  this.loaderService.status.subscribe((val: boolean) => {
      this.loading = val;
    });
	}
}

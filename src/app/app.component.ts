import { Component, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, RoutesRecognized } from '@angular/router';
import { LoaderService } from './_services';

@Component({
	selector: '[id=app]',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent {
	title = 'EBS Ordering System';

	hideElement = false;
	print = false;
	loading = false;
	constructor(
		private render: Renderer2,
		private router: Router,
		private titleService: Title,
		private loaderService: LoaderService
	) {
		this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				if (event.url.indexOf('login') !== -1) {
					this.hideElement = true;
					this.render.removeClass(document.body, 'sidebar-mini');
					this.render.addClass(document.body, 'login-page');
				} else if (event.url.indexOf('print') !== -1) {
					this.hideElement = true;
					this.print = true;
					this.render.removeClass(document.body, 'sidebar-mini');
					this.render.removeClass(document.body, 'hold-transition');
				} else {
					this.hideElement = false;
					this.render.removeClass(document.body, 'login-page');
					this.render.addClass(document.body, 'sidebar-mini');
				}
			}
		});
		this.loaderService.status.subscribe((val: boolean) => {
			this.loading = val;
		});

		router.events.subscribe((event) => {
			// console.log(event);
			if (event instanceof RoutesRecognized) {
				let current_route = event.state.root.children[0];
				let chlid_route = event.state.root.children[0].children[0];

				if (current_route?.data.breadcrumb)
					this.title = current_route?.data.breadcrumb;
				else if (chlid_route?.data.breadcrumb)
					this.title = chlid_route?.data.breadcrumb;

				this.titleService.setTitle('EBS Ordering System - ' + this.title);
			}
		});
	}

	ngOnInit(): void {}

	onLoads(agreed: boolean) {
		this.loading = agreed;
	}
}

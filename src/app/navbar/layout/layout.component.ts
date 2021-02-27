import { Component, OnInit, Renderer2 } from '@angular/core';

import { AuthenticationService } from '../../_services';
import { DeviceDetectorService } from 'ngx-device-detector';
import { BnNgIdleService } from 'bn-ng-idle';

@Component({
	selector: 'app-nav',
	templateUrl: './layout.component.html',
	styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
	sideStatus = false;
	device = this.deviceService.deviceType;
	constructor(
		private authenticationService: AuthenticationService,
		private render: Renderer2,
		private deviceService: DeviceDetectorService,
		private bnIdle: BnNgIdleService
	) {}

	ngOnInit(): void {
		this.bodyClasses();
		if (localStorage.getItem('currentUser')) {
			this.bnIdle.startWatching(1800).subscribe((isTimedOut: boolean) => {
				if (isTimedOut) {
					console.log('session expired');
					this.logout();
				}
			});
		}
	}

	logout() {
		this.authenticationService.logout();
	}

	changeSide() {
		if (this.sideStatus) {
			this.render.addClass(document.body, 'sidebar-collapse');
			if (this.device != 'desktop') {
				this.render.removeClass(document.body, 'sidebar-open');
				this.render.addClass(document.body, 'sidebar-closed');
			}
			this.sideStatus = false;
		} else {
			this.render.removeClass(document.body, 'sidebar-collapse');
			if (this.device != 'desktop') {
				this.render.removeClass(document.body, 'sidebar-closed');
				this.render.addClass(document.body, 'sidebar-open');
			}
			this.sideStatus = true;
		}
	}

	bodyClasses() {
		if (this.device != 'desktop') {
			this.render.removeClass(document.body, 'hold-transition');
			this.render.addClass(document.body, 'sidebar-closed');
			this.render.addClass(document.body, 'sidebar-collapse');
		}
	}
}

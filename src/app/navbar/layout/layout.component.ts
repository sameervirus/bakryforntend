import { Component, OnInit, Renderer2 } from '@angular/core';

import { AuthenticationService } from '../../_services';
import { DeviceDetectorService } from 'ngx-device-detector';

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
		private deviceService: DeviceDetectorService
	) {}

	ngOnInit(): void {
		this.bodyClasses();
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

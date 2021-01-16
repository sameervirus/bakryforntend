import { Component, OnInit, Renderer2 } from '@angular/core';

import { AuthenticationService } from '../../_services';

@Component({
  selector: 'app-nav',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

	sideStatus = true;

  constructor(private authenticationService : AuthenticationService,
  	private render:Renderer2
  	) { }

  ngOnInit(): void {
  }

  logout() {
    this.authenticationService.logout();
  }

  changeSide() {
  	if(this.sideStatus) {
  		this.render.addClass(document.body,"sidebar-collapse");
  		this.sideStatus = false;
  	} else {
  		this.render.removeClass(document.body,"sidebar-collapse");
  		this.sideStatus = true;
  	}
  }

}

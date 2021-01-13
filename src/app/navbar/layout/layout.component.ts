import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../_services';

@Component({
  selector: 'app-nav',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(private authenticationService : AuthenticationService,) { }

  ngOnInit(): void {
  }

  logout() {
    this.authenticationService.logout();
  }

}

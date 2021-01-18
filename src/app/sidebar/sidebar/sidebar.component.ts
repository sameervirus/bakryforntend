import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

	codingMenu:boolean = false;
  ordersMenu:boolean = false;
	ordersSub:boolean = false;
	activesComp:boolean = false;
	reviewsComp:boolean = false;
	historyComp:boolean = false;
	user:any;
  usersMenu:boolean = false;
  usersSub:boolean = false;
  usersComp:boolean = false;
  rolesComp:boolean = false;
  profileComp:boolean = false;
  branchesComp:boolean = false;

  constructor(
    private route: ActivatedRoute,
    private permissionsService: NgxPermissionsService,
    private router: Router
    ) { 
  	router.events.pipe(filter((event:any) => event instanceof NavigationEnd))
          .subscribe((event:any) => 
           {               
              this.changeSide(event.url);
           });
    
  }

  ngOnInit(): void {
	  if(localStorage.getItem('currentUser')) {
	  	this.user = (JSON.parse(localStorage.getItem('currentUser')!)).user;
      const perm = this.user.permissions;
      this.permissionsService.loadPermissions(perm);
    }
  }

  changeView(item:string) {
  	switch (item) {
  		case "coding":
        this.tabsClose();
        if(this.codingMenu) {
          this.codingMenu = false;       
        } else {
          this.codingMenu = true;
        }        
        break;
      case "orders":
        this.tabsClose();
  			if(this.ordersMenu) {
  				this.ordersMenu = false;
  				this.ordersSub = false;          
  			} else {
  				this.ordersMenu = true;
  				this.ordersSub = true;
  			}  			
  			break;
      case "users":
        this.tabsClose();
        if (this.usersMenu) { 
          this.usersMenu = false;
          this.usersSub = false;
        } else {
          this.usersMenu = true;
          this.usersSub = true;
        }
        break;
  		
  		default:
  			// code...
  			break;
  	}

  }

  changeSide(url:string) {
  	if(url.includes("coding")) {
      this.codingMenu = true;
    } else if(url.includes("orders")) {
      this.tabsClose();
  		this.ordersMenu = true;
		  this.ordersSub = true;
  		this.activesComp = url.includes("actives") ? true : false;
  		this.reviewsComp = url.includes("reviews") ? true : false;
  		this.historyComp = url.includes("history") ? true : false;
    } else if(url.includes("users")) {
      this.tabsClose();
      this.usersMenu = true;
      this.usersSub = true;
      this.usersComp = url.endsWith("users") ? true : false;
      this.rolesComp = url.includes("roles") ? true : false;
      this.profileComp = url.includes("profile") ? true : false;
      this.branchesComp = url.includes("branches") ? true : false;
  	} else {
      this.tabsClose();
  	}
  }

  tabsClose() {
    this.codingMenu = false;
    this.ordersMenu = false;
    this.ordersSub = false;
    this.activesComp = false;
    this.reviewsComp = false;
    this.historyComp = false;
    this.usersMenu = false;
    this.usersSub = false;
    this.usersComp = false;
    this.rolesComp = false;
    this.profileComp = false;
    this.branchesComp = false;
  }

}

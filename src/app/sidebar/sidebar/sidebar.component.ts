import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NgxPermissionsService } from 'ngx-permissions';

import { CodingService } from '../../_services';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  permissionItems:boolean = false;

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

  productions:any;
  productionsMenu:boolean = false;
  productionsSub:boolean = false;
  productionsComp:boolean = false;
  productionComp:string = '';

  constructor(
    private route: ActivatedRoute,
    private permissionsService: NgxPermissionsService,
    private router: Router,
    private codingService : CodingService
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
      this.permissionItems = this.checkProductions(this.user.permissions);
      this.permissionsService.loadPermissions(perm);
    }
    this.getProductions();
  }

  checkProductions(perm:any) {
    for (var i = 0; i < perm.length; ++i) {
      if(perm[i] == 'productions review') return true;
      if(perm[i].includes['line']) return true;
    }
    return false;
  }

  getProductions() {
    this.codingService.getProductions().subscribe(res => { this.productions = res.body; });
  }

  showThis() {
    return false;
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
      case "productions":
        this.tabsClose();
        if(this.productionsMenu) {
          this.productionsMenu = false;
          this.productionsSub = false;          
        } else {
          this.productionsMenu = true;
          this.productionsSub = true;
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
    } else if(url.includes("productions")) {
      this.tabsClose();
      this.productionsMenu = true;
      this.productionsSub = true;
      this.productionsComp = url.endsWith("productions") ? true : false;
      this.productionComp = url.split('/')[url.split('/').length - 1];
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
    this.productionsMenu = false;
    this.productionsSub = false;
    this.productionsComp = false;
    this.productionComp = '';
  }

}

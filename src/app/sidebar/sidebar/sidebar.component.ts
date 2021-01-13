import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

	ordersMenu:boolean = false;
	ordersSub:boolean = false;
	activesComp:boolean = false;
	reviewsComp:boolean = false;
	historyComp:boolean = false;
	user:any;

  constructor(private route: ActivatedRoute, private router: Router) { 
  	router.events.pipe(filter((event:any) => event instanceof NavigationEnd))
          .subscribe((event:any) => 
           {               
              this.changeSide(event.url);
           });
    
  }

  ngOnInit(): void {
	  if(localStorage.getItem('currentUser'))
	  	this.user = (JSON.parse(localStorage.getItem('currentUser')!)).user;
  }

  changeView(item:string) {
  	switch (item) {
  		case "orders":
  			if(this.ordersMenu) {
  				this.ordersMenu = false;
  				this.ordersSub = false;
  			} else {
  				this.ordersMenu = true;
  				this.ordersSub = true;
  			}  			
  			break;
  		
  		default:
  			// code...
  			break;
  	}

  }

  changeSide(url:string) {
  	if(url.includes("orders")) {
  		this.ordersMenu = true;
		this.ordersSub = true;
  		this.activesComp = url.includes("actives") ? true : false;
  		this.reviewsComp = url.includes("reviews") ? true : false;
  		this.historyComp = url.includes("history") ? true : false;
  	} else {
		this.ordersMenu = false;
		this.ordersSub = false; 
		this.activesComp=false;
		this.reviewsComp=false;
		this.historyComp=false;
  	}
  }

}

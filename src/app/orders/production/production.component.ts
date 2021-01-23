import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService, NotificationService } from '../../_services';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.css']
})
export class ProductionComponent implements OnInit {

	products:any;
	currentProduction:string = '';
	orders:any;
  canEdit = true;

  constructor(
  	private activatedRoute: ActivatedRoute,
		private notificationService: NotificationService,
		private ordersService: OrdersService,
  ) { 
  	const production = activatedRoute.snapshot.paramMap.get('production');
  	if (production) {
  		this.currentProduction = production;
  		this.getLineProducts(production);
  	}
  }

  ngOnInit(): void {
  	
  }

  getLineProducts(production:string) {
  	this.ordersService.getLineProducts(production).subscribe((res) => {
  		this.products = res.body.products;
  		this.orders = res.body.orders;
      this.canEdit = this.checkStatus(res.body.status);
  	});
  }

  checkStatus(status:any) {
    return status.includes(6);
  }

  claculateQty(items:any) {
    let sum: number = items.map((a:any) => a.pivot_pre_production).reduce(function(a:number, b:number) {
      return Number(a) + Number(b);
    });
    return sum;
  }

  claculateApproveQty(items:any) {
    let sum: number = 0;
    for (let i = 0; i < items.length; i++) {
        sum += items[i].pivot_approve;
    }
    return sum;
  }

  updateProduction(id:number, qty:any) {
    if(! this.canEdit) {    
      this.notificationService.sendMessages(
        'Sorry this review is only for review and print cannot edit',
        'error', 
        true, 
        {'text':'OK'}
      );     
    } else {
    	this.ordersService.updateProductProduction(id,qty.value,this.orders,this.currentProduction).subscribe(
    		res => {
          this.products = res.body.products;
    			this.orders = res.body.orders;
          this.notificationService.sendMessages(
            `Product has been updated successfuly`,
            'success', 
            true, 
            {'text':'OK'}
          );
          
        }, err => {
          let message = '';
          if(err.status == 400) {
            message = err.error.message;
          } else {
            message = 'Server is down please try again';
          }
          this.notificationService.sendMessages(
            message,
            'error', 
            true, 
            {'text':'OK'}
          );
        }
    	);
    }
  }

}

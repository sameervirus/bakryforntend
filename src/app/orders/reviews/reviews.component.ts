import { Component, OnInit, Renderer2 } from '@angular/core';

import { OrdersService, NotificationService } from '../../_services';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  products:any;
  tr:number = 0;

  constructor(
    private render:Renderer2,
    private ordersService : OrdersService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {

    this.getOrdersProducts();
  }

  getOrdersProducts() {
    this.ordersService.getOrdersProducts().subscribe(res => {
      this.products = res.body.data;
    });
  }

  claculateQty(items:any) {
    let sum: number = items.map((a:any) => a.pivot_qty).reduce(function(a:number, b:number) {
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

  expandable(id:number) {
    this.tr = this.tr == id ? 0 : id;
  }

  saveOrder(product:number, order:number, qty:any, pivot_qty:number, p:number, o:number) {
    
    if(qty > pivot_qty || qty == 0) {
      
      this.notificationService.sendMessages(
        'Approve quantity cannot be more than order quantities or zero',
        'error', 
        true, 
        {'text':'OK'}
      );

    } else {
      this.ordersService.updateOrderApproved(product,order,qty).subscribe(
        res => {
          this.products[p].orders[o].pivot_approve = Number(qty);
          if(res.message = 'sucsses') {
            this.notificationService.sendMessages(
              `Order has been updated successfuly`,
              'success', 
              true, 
              {'text':'OK'}
            );
          }
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

  saveProduct(product:any) {

  }

}

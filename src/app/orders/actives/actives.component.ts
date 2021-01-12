import { Component, OnInit } from '@angular/core';

import { OrdersService, NotificationService } from '../../_services';

@Component({
  selector: 'app-actives',
  templateUrl: './actives.component.html',
  styleUrls: ['./actives.component.css']
})
export class ActivesComponent implements OnInit {

  p:number = 1;
  holdItem:any;
  orders:any;

  constructor(
    private ordersService : OrdersService,
    private notificationService: NotificationService
    ) {
      notificationService.reply$.subscribe(res => {
      if(res == 'removeOrder') {
        this.deleteOrder(this.holdItem);
      }
    });
    }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.ordersService.getOrders().subscribe(res => {
      this.orders = res.body
    });
  }

  removeOrder(id:number) {    
    this.holdItem = id;
    this.notificationService.sendMessages(
      `Are you sure remove this order`,
      'warning', 
      false, 
      {'text':'Cancel'}, 
      {'text':'OK','link':'removeOrder'}
    );
  }

  deleteOrder(id:number) {
    this.ordersService.deleteOrder(id).subscribe(res => {
      if(res.message = 'sucsses') {
        this.notificationService.sendMessages(
          `Order has been updated successfuly`,
          'success', 
          true, 
          {'text':'OK'}
        );
        this.getOrders();
      }
    },
    err => {
      let message = '';
      if(err.status == 401) {
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
    });
  }

}

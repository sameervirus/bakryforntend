import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {formatDate} from '@angular/common';

import { OrdersService, NotificationService } from '../../_services';

@Component({
  selector: 'app-productions',
  templateUrl: './productions.component.html',
  styleUrls: ['./productions.component.css']
})
export class ProductionsComponent implements OnInit {

	products:any;
	orders:any;
	today: number = Date.now();
	selectedDate:any;
	tr:number = 0;	
  canEdit = true;

  constructor(
  	private ordersService : OrdersService,
    private notificationService: NotificationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  	this.selectedDate = formatDate(this.today, 'yyyy-MM-dd', 'en-US');
  	this.getProductionProducts(this.selectedDate);
  }

  getProductionProducts(selectedDate:any) {
  	this.ordersService.getProductionProducts(selectedDate).subscribe(res => {
      this.products = res.body.products;
      this.orders = res.body.orders;
      this.canEdit = this.checkStatus(res.body.status);
    });
  }

  checkStatus(status:any) {
    return status.includes(6);
  }

  changeSelected(e:any) {
  	this.products = undefined;
  	this.selectedDate = e.target.value;
  	this.canEdit = this.selectedDate == this.today ? true : false;
  	this.getProductionProducts(e.target.value);
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

  expandable(id:number) {
    this.tr = this.tr == id ? 0 : id;
  }

  saveOrder(product:number, order:number, qty:any, pivot_qty:number, p:number, o:number) { 
  	if(! this.canEdit) {    
      this.notificationService.sendMessages(
        'Sorry this review is only for review and print cannot edit',
        'error', 
        true, 
        {'text':'OK'}
      );     
    } else if(product === undefined || order === undefined) {
      this.notificationService.sendMessages(
        'It must have one order at least',
        'error', 
        true, 
        {'text':'OK'}
      );
    } else {
      this.ordersService.updateOrderApproved(product,order,qty,'pre_production').subscribe(
        res => {
          this.products[p].orders[o].pivot_pre_production = Number(qty);
          if(res.message = 'sucsses') {
            this.notificationService.sendMessages(
              `Product has been updated successfuly`,
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

  toDispatch() {
    if(this.orders.length > 0) {
      this.ordersService.toDispatch(this.orders).subscribe(
        res => {
            if(res.message = 'sucsses') {
              this.canEdit = false;
              this.notificationService.sendMessages(
                `Products has been submit for dispatch successfuly`,
                'success', 
                true, 
                {'text':'OK'}
              );
            }
            this.router.navigate(['orders/productions']);
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
    } else {
      this.notificationService.sendMessages(
        'It must have one order at least',
        'error', 
        true, 
        {'text':'OK'}
      );
    }
  }

}

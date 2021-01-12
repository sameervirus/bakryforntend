import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { OrdersService, NotificationService } from '../../_services';
import { _addToCart, _changeQty, _confirmRemoveItem } from '../../_models/';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

	p:number = 1;
	holdItem:number = 0;
	user:any;
	branch:any;
	products:any;
  orginProducts:any;
  productCategories: any;
  today: any = Date.now();
  dueDate:any= Date.now();
  carts:any;

  constructor(private ordersService : OrdersService,
    private notificationService: NotificationService,
    private _location: Location) { 
    notificationService.reply$.subscribe(res => {
      if(res == 'removeItem') {
        this.carts = _confirmRemoveItem(this.holdItem, this.carts);
      }
    });
  }

  ngOnInit(): void {
    localStorage.removeItem('cart');
  	this.getCreateOrder();
  }

  getCreateOrder() {
  	this.ordersService.getCreateOrder().subscribe(res => {
  		this.branch = res.body.branch;
  		this.products = res.body.products;
  		this.orginProducts = res.body.products;
  		this.productCategories = res.body.categories;
  		this.user = res.body.user;
  		this.dueDate = res.body.due_date;
  	});
  }

  onSearchChange(e:any) {
    let str = e.target.value;
    this.products = this.orginProducts.filter((a:any) => (
                    a.name.includes(str) || 
                    a.client_code.includes(str) || 
                    a.name_ar.includes(str) 
                  ) );
  }

  onStatusChange(event:any) {
  	this.products = event.products;
  	this.orginProducts = event.products;
  }


  addToCart(product:any, qtys:any) {
    this.carts = _addToCart(product, qtys.value);
  }

  changeQty(id:number, input:any) {
    this.carts = _changeQty(id, input, this.carts);
  }

  removeItem(id:number) {    
    this.holdItem = id;
    this.notificationService.sendMessages(
      `Are you sure remove this item from Cart`,
      'warning', 
      false, 
      {'text':'Cancel'}, 
      {'text':'OK','link':'removeItem'}
    );
  }

  closeOrder() {
  	localStorage.removeItem('cart');
  	this._location.back();
  }

  saveOrder(status:number) {
    if(this.carts && this.carts.items != undefined) {
      this.ordersService.createOrder(
        this.carts.items,
        status,
        this.dueDate
      ).subscribe(res => {
        if(res.message = 'sucsses') {
          let sts = status == 1 ? 'saved' : 'placed'
          this.notificationService.sendMessages(
            `Order has been ${sts} successfuly`,
            'success', 
            true, 
            {'text':'OK'}
          );
          this._location.back();
        }
      },
      err => {
        let message = '';
        if(err.status == 400) {
          message = err.error.message;
        } else {
          console.log(err);
          message = 'Server is down please try again';
        }
        this.notificationService.sendMessages(
          message,
          'error', 
          true, 
          {'text':'OK'}
        );
      });
    } else {
      this.notificationService.sendMessages(
        `Please choose at least one item`,
        'warning', 
        true, 
        {'text':'OK'}
      );
    }    
  }

  updateDue(e:any) {
    this.dueDate = e.target.value;
  }

}

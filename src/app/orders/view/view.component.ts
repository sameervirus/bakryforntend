import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { OrdersService } from '../../_services';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  order:any;
  products:any;
  today: any = Date.now();

  constructor(
    private activatedRoute: ActivatedRoute,
    private ordersService : OrdersService
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id) this.getOrderDetails(id);
  }

  getOrderDetails(id:string) {
    this.ordersService.getOrderDetails(id).subscribe(res => {
      this.order = res.body.order;
      this.products = res.body.products;
    });
  }

}

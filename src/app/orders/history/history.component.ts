import { Component, OnInit } from '@angular/core';

import { OrdersService } from '../../_services';

@Component({
	selector: 'app-history',
	templateUrl: './history.component.html',
	styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
	p: number = 1;
	holdItem: any;
	orders: any;

	constructor(private ordersService: OrdersService) {}

	ngOnInit(): void {
		this.getOldOrders();
	}

	getOldOrders() {
		this.ordersService.getOldOrders().subscribe((res) => {
			this.orders = res.body;
		});
	}
}

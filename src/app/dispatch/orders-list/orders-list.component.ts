import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';

import { DispatchService, NotificationService } from '../../_services';
import { Router } from '@angular/router';

@Component({
	selector: 'app-orders-list',
	templateUrl: './orders-list.component.html',
	styleUrls: ['./orders-list.component.css'],
})
export class OrdersListComponent implements OnInit {
	orders: any;
	orginOrders: any;
	boxes: any;
	today: number = Date.now();
	selectedDate: any;
	hasApprove = true;
	canApprove = false;

	constructor(
		private dispatchService: DispatchService,
		private notificationService: NotificationService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.selectedDate = formatDate(this.today, 'yyyy-MM-dd', 'en-US');
		this.getDispatchOrders(this.selectedDate);
	}

	getDispatchOrders(date: any) {
		return this.dispatchService.getDispatchOrders(date).subscribe((res) => {
			this.orders = res.body.orders;
			this.orginOrders = res.body.orders;
			this.boxes = res.body.boxes;
			this.hasApprove = this.checkStatus(res.body.status);
			this.canApprove = this.checkBoxedQty(this.orders, res.body.dispatch);
		});
	}

	getBoxQty(order: number) {
		let qty = 0;
		this.boxes.forEach((box: any) => {
			box.forEach((item: any) => {
				if (item.order_id == order) {
					item.products.forEach((product: any) => {
						qty = qty + Number(product.pivot.qty);
					});
				}
			});
		});
		return qty;
	}

	checkStatus(status: any) {
		return !status.includes(null);
	}

	changeSelected(e: any) {
		this.orders = undefined;
		this.selectedDate = e.target.value;
		this.getDispatchOrders(e.target.value);
	}

	onSearchChange(e: any) {
		let str = e.target.value;
		this.orders = this.orginOrders.filter(
			(a: any) =>
				a.code.toLowerCase().includes(str.toLowerCase()) ||
				a.branch.toLowerCase().includes(str.toLowerCase()) ||
				a.client.toLowerCase().includes(str.toLowerCase()) ||
				a.status.toLowerCase().includes(str.toLowerCase())
		);
	}

	checkBoxedQty(orders: any, dispatch: any) {
		if (!dispatch.includes(null)) return false;
		if (!orders) return false;
		let boxesQty = 0;
		let ordersQty = 0;
		orders.forEach((order: any) => {
			boxesQty += Number(this.getBoxQty(order.id));
			ordersQty += Number(order.productions);
		});
		if (boxesQty == 0) return false;
		if (boxesQty == ordersQty) return true;
		return false;
	}

	approveDispatch() {
		this.dispatchService.approveDispatch(this.orders).subscribe(
			(res) => {
				if ((res.message = 'sucsses')) {
					this.notificationService.sendMessages(
						`Product has been Recevied successfuly`,
						'success',
						true,
						{ text: 'OK' }
					);
					this.getDispatchOrders(this.selectedDate);
				}
			},
			(err) => {
				let message = '';
				if (err.status == 400) {
					message = err.error.message;
				} else {
					message = 'Server is down please try again';
				}
				this.notificationService.sendMessages(message, 'error', true, {
					text: 'OK',
				});
			}
		);
	}
}

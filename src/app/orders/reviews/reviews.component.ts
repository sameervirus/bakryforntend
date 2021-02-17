import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';

import { OrdersService, NotificationService } from '../../_services';

@Component({
	selector: 'app-reviews',
	templateUrl: './reviews.component.html',
	styleUrls: ['./reviews.component.css'],
})
export class ReviewsComponent implements OnInit {
	products: any;
	orginProducts: any;
	orders: any;
	today: number = Date.now();
	selectedDate: any;
	tr: number = 0;
	canEdit = true;

	constructor(
		private ordersService: OrdersService,
		private notificationService: NotificationService
	) {}

	ngOnInit(): void {
		this.selectedDate = formatDate(this.today, 'yyyy-MM-dd', 'en-US');
		this.getOrdersProducts(this.selectedDate);
	}

	getOrdersProducts(selectedDate: any) {
		this.ordersService.getOrdersProducts(selectedDate).subscribe((res) => {
			this.products = res.body.products;
			this.orginProducts = res.body.products;
			this.orders = res.body.orders;
			this.canEdit = this.checkStatus(res.body.status);
		});
	}

	checkStatus(status: any) {
		return status.includes(3);
	}

	changeSelected(e: any) {
		this.products = undefined;
		this.selectedDate = e.target.value;
		this.getOrdersProducts(e.target.value);
	}

	claculateQty(items: any) {
		let sum: number = items
			.map((a: any) => a.pivot_qty)
			.reduce(function (a: number, b: number) {
				return Number(a) + Number(b);
			});
		return sum;
	}

	claculateApproveQty(items: any) {
		let sum: number = 0;
		for (let i = 0; i < items.length; i++) {
			sum += items[i].pivot_pre;
		}
		return sum;
	}

	onSearchChange(e: any) {
		let str = e.target.value;
		this.products = this.orginProducts.filter(
			(a: any) =>
				a.code.toLowerCase().includes(str.toLowerCase()) ||
				a.name.toLowerCase().includes(str.toLowerCase()) ||
				a.arabic_name.toLowerCase().includes(str.toLowerCase())
		);
	}

	expandable(id: number) {
		this.tr = this.tr == id ? 0 : id;
	}

	saveOrder(
		product: number,
		order: number,
		qty: any,
		pivot_qty: number,
		p: number,
		o: number
	) {
		if (!this.canEdit) {
			this.notificationService.sendMessages(
				'Sorry this review is only for review and print cannot edit',
				'error',
				true,
				{ text: 'OK' }
			);
			// } else if (qty > pivot_qty) {
			// 	this.notificationService.sendMessages(
			// 		'Approve quantity cannot be more than order quantities',
			// 		'error',
			// 		true,
			// 		{ text: 'OK' }
			// 	);
		} else if (product === undefined || order === undefined) {
			this.notificationService.sendMessages(
				'It must have one order at least',
				'error',
				true,
				{ text: 'OK' }
			);
		} else {
			this.ordersService
				.updateOrderApproved(product, order, qty, 'pre_approve')
				.subscribe(
					(res) => {
						this.products[p].orders[o].pivot_pre = Number(qty);
						if ((res.message = 'sucsses')) {
							this.notificationService.sendMessages(
								`Order has been updated successfuly`,
								'success',
								true,
								{ text: 'OK' }
							);
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

	toProduction() {
		if (this.orders.length > 0) {
			this.ordersService.toProduction(this.orders).subscribe(
				(res) => {
					if ((res.message = 'sucsses')) {
						this.notificationService.sendMessages(
							`Orders has been submit for productions successfuly`,
							'success',
							true,
							{ text: 'OK' }
						);
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
		} else {
			this.notificationService.sendMessages(
				'It must have one order at least',
				'error',
				true,
				{ text: 'OK' }
			);
		}
	}
}

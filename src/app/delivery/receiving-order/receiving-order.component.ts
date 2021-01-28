import { Component, OnInit } from '@angular/core';

import { DeliveryService, NotificationService } from '../../_services';

@Component({
	selector: 'app-receiving-order',
	templateUrl: './receiving-order.component.html',
	styleUrls: ['./receiving-order.component.css'],
})
export class ReceivingOrderComponent implements OnInit {
	orders: any;
	p = 1;
	today: number = Date.now();
	loads = false;

	constructor(
		private deliveryService: DeliveryService,
		private notificationService: NotificationService
	) {}

	ngOnInit(): void {
		this.getDeliverdOrder();
	}

	getDeliverdOrder() {
		this.deliveryService.getDeliverdOrder().subscribe((res) => {
			this.orders = res.body.orders;
		});
	}

	saveDelivery(
		product: number,
		order: number,
		qty: any,
		qty_production: number,
		p: number,
		o: number
	) {
		if (qty > qty_production) {
			this.notificationService.sendMessages(
				'Delivered quantity cannot be more than Production quantities',
				'error',
				true,
				{ text: 'OK' }
			);
		} else if (product === undefined || order === undefined) {
			this.notificationService.sendMessages(
				'It must have one order at least',
				'error',
				true,
				{ text: 'OK' }
			);
		} else {
			this.loads = true;
			this.deliveryService
				.updateOrderDelivery(product, order, qty, 'qty_delivered')
				.subscribe(
					(res) => {
						this.orders[o].products[p].qty_delivered = Number(qty);
						if ((res.message = 'sucsses')) {
							this.notificationService.sendMessages(
								`Order has been updated successfuly`,
								'success',
								true,
								{ text: 'OK' }
							);
						}
						this.loads = false;
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
						this.loads = false;
					}
				);
		}
	}

	saveOrder(order: any) {
		if (order) {
			this.deliveryService.saveOrder(order).subscribe(
				(res) => {
					if ((res.message = 'sucsses')) {
						this.orders = undefined;
						this.notificationService.sendMessages(
							`Order has been Recevied successfuly`,
							'success',
							true,
							{ text: 'OK' }
						);
						this.getDeliverdOrder();
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
}

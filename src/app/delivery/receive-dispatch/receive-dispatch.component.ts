import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';

import { DeliveryService, NotificationService } from '../../_services';

@Component({
	selector: 'app-receive-dispatch',
	templateUrl: './receive-dispatch.component.html',
	styleUrls: ['./receive-dispatch.component.css'],
})
export class ReceiveDispatchComponent implements OnInit {
	distributions: any;
	orders: any;
	boxes: any;
	today: number = Date.now();
	selectedDate: any;
	canApprove = true;
	hasDriver = true;

	constructor(
		private deliveryService: DeliveryService,
		private notificationService: NotificationService
	) {}

	ngOnInit(): void {
		this.selectedDate = formatDate(this.today, 'yyyy-MM-dd', 'en-US');
		this.getDeliveryOrders(this.selectedDate);
	}

	getDeliveryOrders(date: any) {
		return this.deliveryService
			.getDeliveryOrders(date)
			.subscribe((res: any) => {
				this.distributions = res.body.distributions;
				this.orders = res.body.orders;
				this.canApprove = this.checkStatus(res.body.status);
				this.hasDriver = this.checkStatus(res.body.driver);
			});
	}

	checkStatus(status: any) {
		return !status.includes(null);
	}

	changeSelected(e: any) {
		this.distributions = undefined;
		this.selectedDate = e.target.value;
		this.getDeliveryOrders(e.target.value);
	}

	driverApprove() {
		if (this.orders.length > 0) {
			this.deliveryService.driverApprove(this.orders).subscribe(
				(res) => {
					if ((res.message = 'sucsses')) {
						this.notificationService.sendMessages(
							`Orders has been approved`,
							'success',
							true,
							{ text: 'OK' }
						);
						this.getDeliveryOrders(this.selectedDate);
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

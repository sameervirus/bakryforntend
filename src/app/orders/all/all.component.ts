import { Component, OnInit } from '@angular/core';

import { OrdersService, NotificationService } from '../../_services';

@Component({
	selector: 'app-all',
	templateUrl: './all.component.html',
	styleUrls: ['./all.component.css'],
})
export class AllComponent implements OnInit {
	p: number = 1;
	holdItem: any;
	orders: any;
	ordersOrigin: any;
	status: any;
	clients: any;

	constructor(
		private ordersService: OrdersService,
		private notificationService: NotificationService
	) {
		notificationService.reply$.subscribe((res) => {
			if (res == 'removeOrder') {
				this.deleteOrder(this.holdItem);
			}
		});
	}

	ngOnInit(): void {
		this.getOrders();
	}

	sortFilters: any[] = [
		{ name: 'Low', id: 'low' },
		{ name: 'High', id: 'high' },
	];

	getOrders() {
		this.ordersService.getAllOrders().subscribe((res) => {
			this.ordersOrigin = res.body.orders;
			this.orders = res.body.orders;
			this.status = res.body.status;
			this.clients = res.body.clients;
		});
	}

	getSatuts(id: number) {
		return this.status.find((x: any) => x.id === id);
	}

	getClient(id: number) {
		return this.clients.find((x: any) => x.id === id);
	}

	onClientChange(e: any) {
		if (e && e.id != 0) {
			this.orders = this.ordersOrigin.filter(
				(item: any) => item.branch.client_id == e.id
			);
		} else {
			this.orders = this.ordersOrigin;
		}
	}

	onSearchChange(e: any) {
		let str = e.target.value;
		this.orders = this.ordersOrigin.filter(
			(a: any) =>
				a.branch.name.toLowerCase().includes(str.toLowerCase()) ||
				a.branch.name_ar.toLowerCase().includes(str.toLowerCase()) ||
				a.code.toLowerCase().includes(str.toLowerCase())
		);
	}

	onStatusChange(e: any) {
		if (e && e.id != 0) {
			this.orders = this.ordersOrigin.filter(
				(item: any) => item.status_id == e.id
			);
		} else {
			this.orders = this.ordersOrigin;
		}
	}

	changeSelected(e: any) {
		if (e && e.id != 0) {
			this.orders = this.ordersOrigin.filter(
				(item: any) => item.due_date == e.target.value
			);
		} else {
			this.orders = this.ordersOrigin;
		}
	}

	removeOrder(id: number) {
		this.holdItem = id;
		this.notificationService.sendMessages(
			`Are you sure remove this order`,
			'warning',
			false,
			{ text: 'Cancel' },
			{ text: 'OK', link: 'removeOrder' }
		);
	}

	deleteOrder(id: number) {
		this.ordersService.deleteOrder(id).subscribe(
			(res) => {
				if ((res.message = 'sucsses')) {
					this.notificationService.sendMessages(
						`Order has been updated successfuly`,
						'success',
						true,
						{ text: 'OK' }
					);
					this.getOrders();
				}
			},
			(err) => {
				let message = '';
				if (err.status == 401) {
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

	sortByField(f: any) {
		if (f.id == 'high') {
			this.orders = this.ordersOrigin.sort((a: any, b: any) => {
				if (Number(a['qty']) > Number(b['qty'])) return -1;
				if (Number(a['qty']) < Number(b['qty'])) return 1;
				return 0;
			});
		} else if (f.id == 'low') {
			this.orders = this.ordersOrigin.sort((a: any, b: any) => {
				if (Number(a['qty']) < Number(b['qty'])) return -1;
				if (Number(a['qty']) > Number(b['qty'])) return 1;
				return 0;
			});
		} else {
			this.orders = this.ordersOrigin;
		}
	}
}

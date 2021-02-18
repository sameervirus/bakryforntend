import { Component, OnInit } from '@angular/core';

import {
	CodingService,
	NotificationService,
	ReportsService,
} from '../../_services';

@Component({
	selector: 'app-orders',
	templateUrl: './orders.component.html',
	styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
	client: number = 0;
	clients: any;
	branch: number = 0;
	branches: any;
	statuses: any;
	status: number = 0;
	dueDate: any;
	orders: any;
	p: number = 0;
	constructor(
		private codingService: CodingService,
		private reportsService: ReportsService,
		private notificationService: NotificationService
	) {}

	ngOnInit(): void {
		this.getBranches();
		this.getClients();
		this.getStatus();
	}

	getBranches() {
		this.codingService.getBranches().subscribe((res) => {
			this.branches = res.body;
		});
	}

	getClients() {
		this.codingService.getClients().subscribe((res) => {
			this.clients = res.body;
		});
	}

	getStatus() {
		this.codingService.getStatus().subscribe((res) => {
			this.statuses = res.body;
		});
	}

	onClientChange(e: any) {
		if (e && e.id != 0) {
			this.client = e.id;
		} else {
			this.client = 0;
		}
	}

	onBranchChange(e: any) {
		if (e && e.id != 0) {
			this.branch = e.id;
		} else {
			this.branch = 0;
		}
	}

	onStatusChange(e: any) {
		if (e && e.id != 0) {
			this.status = e.id;
		} else {
			this.status = 0;
		}
	}

	changeSelected(e: any) {
		if (e) {
			this.dueDate = e.target.value;
		} else {
			this.dueDate = 0;
		}
	}

	runReport() {
		if (this.dueDate !== undefined && this.dueDate != 0) {
			this.orders = 'empty';
			this.reportsService
				.getOrdersDetails(this.dueDate, this.client, this.branch, this.status)
				.subscribe((arg) => (this.orders = arg.body.data));
		} else {
			this.notificationService.sendMessages(
				'Please select date first',
				'error',
				true,
				{ text: 'Ok' }
			);
		}
	}
}

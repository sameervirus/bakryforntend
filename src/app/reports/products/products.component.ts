import { Component, OnInit } from '@angular/core';
import { ExcelService } from '../../_services/';

import {
	CodingService,
	NotificationService,
	ReportsService,
} from '../../_services';

@Component({
	selector: 'app-products',
	templateUrl: './products.component.html',
	styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
	client: number = 0;
	clients: any;
	branch: number = 0;
	branches: any;
	distributions: any;
	distribution: number = 0;
	fDueDate: any;
	tDueDate: any;
	products: any;
	p: number = 0;
	constructor(
		private codingService: CodingService,
		private reportsService: ReportsService,
		private notificationService: NotificationService,
		private excelService: ExcelService
	) {}

	ngOnInit(): void {
		this.getBranches();
		this.getClients();
		this.getDistributions();
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

	getDistributions() {
		this.codingService.getDistribution().subscribe((res) => {
			this.distributions = res.body;
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

	onDistributionChange(e: any) {
		if (e && e.id != 0) {
			this.distribution = e.id;
		} else {
			this.distribution = 0;
		}
	}

	fChangeSelected(e: any) {
		if (e) {
			this.fDueDate = e.target.value;
		} else {
			this.fDueDate = 0;
		}
	}

	tChangeSelected(e: any) {
		if (e) {
			this.tDueDate = e.target.value;
		} else {
			this.tDueDate = 0;
		}
	}

	runReport() {
		if (
			this.fDueDate !== undefined &&
			this.fDueDate != 0 &&
			this.tDueDate !== undefined &&
			this.tDueDate != 0
		) {
			this.products = 'empty';
			this.reportsService
				.getProductsDetails(
					this.fDueDate,
					this.tDueDate,
					this.client,
					this.branch,
					this.distribution
				)
				.subscribe((arg) => {
					this.products = arg.body.products;
					console.log(this.products);
				});
		} else {
			this.notificationService.sendMessages(
				'Please select date first',
				'error',
				true,
				{ text: 'Ok' }
			);
		}
	}

	exportAsXLSX(): void {
		this.excelService.exportAsExcelFile(
			this.products,
			'Products Details ' + this.fDueDate + '-' + this.tDueDate
		);
	}
}

import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DispatchService, NotificationService } from '../../_services';
@Component({
	selector: 'app-production',
	templateUrl: './production.component.html',
	styleUrls: ['./production.component.css'],
})
export class ProductionComponent implements OnInit {
	products: any;
	orders: any;
	today: number = Date.now();
	selectedDate: any;
	canApprove = true;

	constructor(
		private dispatchService: DispatchService,
		private notificationService: NotificationService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.selectedDate = formatDate(this.today, 'yyyy-MM-dd', 'en-US');
		this.getProductionProducts(this.selectedDate);
	}

	getProductionProducts(selectedDate: any) {
		this.dispatchService
			.getProductionProducts(selectedDate)
			.subscribe((res) => {
				this.products = res.body.products;
				this.orders = res.body.orders;
				this.canApprove = this.checkStatus(res.body.approveProductions);
			});
	}

	checkStatus(status: any) {
		return status.includes(null);
	}

	changeSelected(e: any) {
		this.products = undefined;
		this.selectedDate = e.target.value;
		this.getProductionProducts(e.target.value);
	}

	claculateProductionQty(items: any) {
		let sum: number = items
			.map((a: any) => a.pivot_production)
			.reduce(function (a: number, b: number) {
				return Number(a) + Number(b);
			});
		return sum;
	}

	claculateApproveQty(items: any) {
		let sum: number = 0;
		for (let i = 0; i < items.length; i++) {
			sum += items[i].pivot_approve;
		}
		return sum;
	}

	approveProductions() {
		this.dispatchService.approveProductions(this.orders).subscribe(
			(res) => {
				if ((res.message = 'sucsses')) {
					this.notificationService.sendMessages(
						`Product has been Recevied successfuly`,
						'success',
						true,
						{ text: 'OK' }
					);
					this.router.navigate(['/dispatch/list']);
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

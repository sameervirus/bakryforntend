import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
	IAngularMyDpOptions,
	IMyDisabledDates,
	IMyDateModel,
} from 'angular-mydatepicker';

import { OrdersService, NotificationService } from '../../_services';

@Component({
	selector: 'app-modify',
	templateUrl: './modify.component.html',
	styleUrls: ['./modify.component.css'],
})
export class ModifyComponent implements OnInit {
	order: any;
	status: any;
	dates: any;
	today: any = Date.now();
	dueDate: any = Date.now();
	model: IMyDateModel = null!;
	changes: any = {
		status: 0,
		products: [],
		due: '',
	};

	myDatePickerOptions: IAngularMyDpOptions = {
		stylesData: {
			selector: 'dp1',
			styles: this.getDisabledStyles(),
		},
		disableDates: [],
		// other options here
	};

	constructor(
		private activatedRoute: ActivatedRoute,
		private notificationService: NotificationService,
		private ordersService: OrdersService
	) {}

	ngOnInit(): void {
		const id = this.activatedRoute.snapshot.paramMap.get('id');
		if (id) {
			this.getOrderDetails(id);
		}
	}

	getOrderDetails(id: string) {
		this.ordersService.modifyOrder(id).subscribe((res) => {
			this.order = res.body.order;
			this.status = res.body.status;
			this.dueDate = res.body.order.due_date;
			this.model = {
				isRange: false,
				singleDate: { jsDate: new Date(this.dueDate) },
			};
			this.disabledDates(res.body.dates);
		});
	}

	// calling this method disable dates
	disabledDates(dates: any): void {
		let items = [];
		for (let i = 0; i < dates.length; i++) {
			const element = dates[i].split('-');
			items.push({
				year: Number(element[0]),
				month: Number(element[1]),
				day: Number(element[2]),
			});
		}
		let copy: IAngularMyDpOptions = this.getCopyOfOptions();
		copy.disableDates = this.getDisabledDates(items);
		this.myDatePickerOptions = copy;
	}

	// CSS styles
	getDisabledStyles(): string {
		return `
    .dp1 .yogaDates {
        background: repeating-linear-gradient(-45deg, red 7px, #ccc 8px, 
                    transparent 7px, transparent 14px);
        font-weight: bold;
        color: green;
    }
  `;
	}

	// own style dates (10.6.2020 - 16.6.2020)
	getDisabledDates(items: any): Array<IMyDisabledDates> {
		return [
			{
				dates: items,
				styleClass: 'yogaDates',
			},
		];
	}

	getCopyOfOptions(): IAngularMyDpOptions {
		return JSON.parse(JSON.stringify(this.myDatePickerOptions));
	}

	onStatusChange(e: any) {
		if (e) {
			this.changes.status = e.id;
		}
	}

	changeQty(id: number, qty: any, field: string) {
		if (this.changes.products.length > 0) {
			let ok = true;
			for (let i = 0; i < this.changes.products.length; i++) {
				if (
					id == this.changes.products[i].product_id &&
					field == this.changes.products[i].field
				) {
					this.changes.products[i].qty = qty.value;
					ok = false;
				}
			}
			if (ok) {
				this.changes.products.push({
					product_id: id,
					qty: qty.value,
					field: field,
				});
			}
		} else {
			this.changes.products.push({
				product_id: id,
				qty: qty.value,
				field: field,
			});
		}
	}

	updateOrder() {
		this.changes.due =
			this.model.singleDate?.date?.year +
			'-' +
			this.model.singleDate?.date?.month +
			'-' +
			this.model.singleDate?.date?.day;

		this.ordersService
			.updateModifyOrder(
				this.order.id,
				this.changes.due,
				JSON.stringify(this.changes.products),
				this.changes.status
			)
			.subscribe(
				(res) => {
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

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DispatchService } from '../../_services';

@Component({
	selector: 'app-print',
	templateUrl: './print.component.html',
	styleUrls: ['./print.component.css'],
})
export class PrintComponent implements OnInit {
	today = new Date();
	data: any;
	title = 'Work Sheet';
	order: any;
	orders: any;
	products: any;
	selectedDay: any;
	type: string = '';
	box: any;
	boxOrder: any;

	@Output() loads = new EventEmitter<boolean>();

	constructor(
		private activatedRoute: ActivatedRoute,
		private dispatchService: DispatchService
	) {}

	ngOnInit(): void {
		const type = this.activatedRoute.snapshot.paramMap.get('type');
		const id = this.activatedRoute.snapshot.paramMap.get('id');
		if (type == 'order') {
			this.type = type;
			this.title = 'Dispatch Order';
			if (id) this.getDispatchOrder(id);
		}
		if (type == 'boxes') {
			this.type = type;
			this.title = 'Order Boxes';
			if (id) this.getDispatchOrder(id);
		}
		if (type == 'productions') {
			this.type = type;
			this.title = 'Productions List';
			if (id) {
				this.selectedDay = id;
				this.getProductionProducts(id);
			}
		}
		if (type == 'dispatch') {
			this.type = type;
			this.title = 'Dispatch List';
			if (id) {
				this.selectedDay = id;
				this.getProductionProducts(id);
			}
		}
		if (type == 'box') {
			this.type = type;
			this.title = 'Box Details';
			if (id) {
				this.getBoxDetails(id);
			}
		}
		if (type == 'orders') {
			this.type = type;
			this.title = 'Dispatch Orders';
			if (id) {
				this.dispatchOrders(id);
			}
		}
	}

	getDispatchOrder(id: string) {
		this.loading(true);
		this.dispatchService.getDispatchOrder(id).subscribe((res) => {
			this.orders = [res.body.order];
			this.print();
		});
	}

	dispatchOrders(ids: string) {
		this.loading(true);
		this.dispatchService.dispatchOrders(ids).subscribe((res) => {
			this.orders = res.body.orders;
			this.print();
		});
	}

	sortProducts(order: any[]) {
		return order.sort((a, b) => (a.code < b.code ? -1 : 1));
	}

	getProductionProducts(selectedDate: any) {
		this.dispatchService
			.getProductionProducts(selectedDate)
			.subscribe((res) => {
				this.products = res.body.products;
				this.print();
			});
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

	getBoxDetails(id: string) {
		this.dispatchService.getBoxDetails(id).subscribe((res) => {
			this.box = res.body.box;
			this.boxOrder = res.body.order;
			this.print();
		});
	}

	boxPosition(id: number) {
		return this.boxOrder.boxes.findIndex((x: any) => x.id === id);
	}

	loading(agreed: boolean) {
		this.loads.emit(agreed);
	}

	print() {
		setTimeout(() => {
			window.print();
		}, 5000);
	}

	groupByArray(xs: any, key: any) {
		return xs.reduce(function (rv: any, x: any) {
			let v = key instanceof Function ? key(x) : x[key];
			let vSub = v.substring(0, 5);
			let el = rv.find((r: any) => r && r.key === vSub);
			if (el) {
				el.values.push(x);
			} else {
				rv.push({ key: vSub, values: [x] });
			}
			return rv;
		}, []);
	}

	totals(items: any, field: string) {
		let sum: number;

		switch (field) {
			case 'qty_approved':
				sum = items
					.map((a: any) => a.qty_approved)
					.reduce(function (a: any, b: any) {
						return a + b;
					});
				break;

			case 'qty_production':
				sum = items
					.map((a: any) => a.qty_production)
					.reduce(function (a: any, b: any) {
						return a + b;
					});
				break;
			default:
				sum = 0;
				break;
		}

		return sum;
	}
}

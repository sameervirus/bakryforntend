import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DispatchService, NotificationService } from '../../_services';

@Component({
	selector: 'app-dispatching',
	templateUrl: './dispatching.component.html',
	styleUrls: ['./dispatching.component.css'],
})
export class DispatchingComponent implements OnInit {
	order: any;
	products: any;
	boxes: any;
	packings: any;
	tempBox: any = [];
	tempBoxType = 0;
	tempBoxId = 0;
	today: any = Date.now();
	holdItem: number = 0;

	constructor(
		private dispatchService: DispatchService,
		private activatedRoute: ActivatedRoute,
		private notificationService: NotificationService
	) {
		notificationService.reply$.subscribe((res) => {
			if (res == 'removeItem') {
				this.deleteBox(this.holdItem);
			}
		});
	}

	ngOnInit(): void {
		const id = this.activatedRoute.snapshot.paramMap.get('id');
		if (id) this.getDispatchOrder(id);
	}

	getDispatchOrder(id: string) {
		this.dispatchService.getDispatchOrder(id).subscribe((res) => {
			this.order = res.body.order;
			this.products = res.body.products;
			this.boxes = res.body.boxes;
			this.packings = res.body.packings;
		});
	}

	addProduct(product: any, qtys: any) {
		if (this.tempBox.findIndex((obj: any) => obj.id == product.id) == -1) {
			product.boxQty = qtys.value;
			this.tempBox.push(product);
		} else {
			let boxIndex = this.tempBox.findIndex((obj: any) => obj.id == product.id);
			this.tempBox[boxIndex].boxQty =
				Number(this.tempBox[boxIndex].boxQty) + Number(qtys.value);
		}

		if (product.qty_production == qtys.value) {
			this.products = this.products.filter((obj: any) => obj.id != product.id);
		} else {
			let objIndex = this.products.findIndex(
				(obj: any) => obj.id == product.id
			);
			this.products[objIndex].qty_production =
				Number(product.qty_production) - Number(qtys.value);
		}
	}

	deleteFromBox(item: any) {
		let productIndex = this.products.findIndex((obj: any) => obj.id == item.id);
		if (productIndex == -1) {
			this.products.push(item);
		} else {
			this.products[productIndex].qty_production += Number(item.boxQty);
		}
		this.tempBox = this.tempBox.filter((obj: any) => obj.id != item.id);
	}

	onInputChange(packing: any) {
		this.tempBoxType = packing;
	}

	createBox() {
		if (this.tempBoxType == 0) {
			this.notificationService.sendMessages(
				'Please select box type',
				'error',
				true,
				{ text: 'OK' }
			);
		} else {
			if (this.tempBox.length < 1) {
				this.notificationService.sendMessages(
					'Box must have products',
					'error',
					true,
					{ text: 'OK' }
				);
			} else {
				this.dispatchService
					.addBox(this.tempBox, this.tempBoxType, this.order, this.tempBoxId)
					.subscribe(
						(res) => {
							if ((res.message = 'sucsses')) {
								this.notificationService.sendMessages(
									`Products has been Add to Box Successfuly`,
									'success',
									true,
									{ text: 'OK' }
								);
								this.tempBox = [];
								this.getDispatchOrder(this.order.id);
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

	editBox(box: any) {
		box.products.forEach((element: any) => {
			element.boxQty = element.pivot.qty;
			element.qty_production = element.pivot.qty;
		});
		this.tempBoxType = box.packing_id;
		this.tempBox = box.products;
		this.tempBoxId = box.id;
	}

	removeItem(id: number) {
		this.holdItem = id;
		this.notificationService.sendMessages(
			`Are you sure remove Box`,
			'warning',
			false,
			{ text: 'Cancel' },
			{ text: 'OK', link: 'removeItem' }
		);
	}

	deleteBox(box: number) {
		if (box) {
			this.dispatchService.deleteBox(box).subscribe(
				(res) => {
					if ((res.message = 'sucsses')) {
						this.notificationService.sendMessages(
							`Box had been deleted Successfuly`,
							'success',
							true,
							{ text: 'OK' }
						);
						this.tempBox = [];
						this.getDispatchOrder(this.order.id);
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

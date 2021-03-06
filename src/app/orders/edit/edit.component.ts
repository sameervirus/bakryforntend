import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { OrdersService, NotificationService } from '../../_services';
import {
	_addToCart,
	_changeQty,
	_confirmRemoveItem,
	_addExistProduct,
} from '../../_models/';

@Component({
	selector: 'app-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
	order: any;
	orderProduct: any;
	branch: any;
	products: any;
	orginProducts: any;
	productCategories: any;
	today: any = Date.now();
	carts: any = {};
	holdItem: any;
	dueDate: any = Date.now();

	constructor(
		private activatedRoute: ActivatedRoute,
		private notificationService: NotificationService,
		private ordersService: OrdersService,
		private router: Router,
		private _location: Location
	) {
		notificationService.reply$.subscribe((res) => {
			if (res == 'removeItem') {
				this.carts = _confirmRemoveItem(this.holdItem, this.carts);
			}
		});
	}

	ngOnInit(): void {
		const id = this.activatedRoute.snapshot.paramMap.get('id');
		if (id) this.getOrderDetails(id);
	}

	getOrderDetails(id: string) {
		this.ordersService.editOrderDetails(id).subscribe((res) => {
			this.order = res.body.order;
			this.products = res.body.products;
			this.orginProducts = res.body.products;
			this.productCategories = res.body.categories;
			this.productCategories.unshift({ id: '0', name: 'All Products' });
			this.branch = res.body.branch;
			this.dueDate = res.body.order.due_date;
			this.addExistProduct(res.body.order_products);
		});
	}

	addExistProduct(items: any) {
		this.carts = _addExistProduct(items, this.carts);
	}

	onSearchChange(e: any) {
		let str = e.target.value;
		this.products = this.orginProducts.filter(
			(a: any) =>
				a.name.toLowerCase().includes(str.toLowerCase()) ||
				a.client_code.toLowerCase().includes(str.toLowerCase()) ||
				a.name_ar.toLowerCase().includes(str.toLowerCase())
		);
	}

	onStatusChange(event: any) {
		if (event && event.id != 0) {
			this.products = this.orginProducts.filter(
				(item: any) => item.category_id == event.id
			);
		} else {
			this.products = this.orginProducts;
		}
	}

	addToCart(product: any, qtys: any) {
		this.carts = _addToCart(product, qtys.value);
	}

	changeQty(id: number, input: any) {
		this.carts = _changeQty(id, input, this.carts);
	}

	removeItem(id: number) {
		this.holdItem = id;
		this.notificationService.sendMessages(
			`Are you sure remove this item from Cart`,
			'warning',
			false,
			{ text: 'Cancel' },
			{ text: 'OK', link: 'removeItem' }
		);
	}

	closeOrder() {
		localStorage.removeItem('cart');
		this._location.back();
	}

	updateOrder(status: number) {
		if (this.carts && this.carts.items != undefined) {
			this.ordersService
				.updateOrder(this.order.id, this.carts.items, status, this.dueDate)
				.subscribe(
					(res) => {
						if ((res.message = 'sucsses')) {
							this.notificationService.sendMessages(
								`Order has been updated successfuly`,
								'success',
								true,
								{ text: 'OK' }
							);
							this.router.navigate(['/orders/actives']);
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
				`Please choose at least one item`,
				'warning',
				true,
				{ text: 'OK' }
			);
		}
	}

	updateDue(e: any) {
		this.dueDate = e.target.value;
	}
}

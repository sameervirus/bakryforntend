import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
	users = false;
	roles = false;
	branch = false;
	coding = false;
	orders = false;
	review = false;
	password = false;
	productions = false;
	line = false;
	approveProductions = false;
	packing = false;
	driver = false;
	delivery = false;

	user: any;

	constructor() {}

	ngOnInit(): void {
		this.user = JSON.parse(localStorage.getItem('currentUser')!).user;

		if (
			this.user.permissions.includes('manage users') ||
			this.user.permissions.includes('manage all users')
		) {
			this.users = true;
		}
		if (this.user.permissions.includes('manage roles')) {
			this.roles = true;
		}
		if (this.user.permissions.includes('change branch')) {
			this.branch = true;
		}
		if (this.user.permissions.includes('coding')) {
			this.coding = true;
		}
		if (this.user.permissions.includes('orders')) {
			this.orders = true;
		}
		if (this.user.permissions.includes('review orders')) {
			this.review = true;
		}
		if (this.user.permissions.includes('branches password')) {
			this.password = true;
		}
		if (this.user.permissions.includes('productions review')) {
			this.productions = true;
		}
		if (
			this.user.permissions.includes('ice-creams line') ||
			this.user.permissions.includes('pastries line') ||
			this.user.permissions.includes('bakeries line') ||
			this.user.permissions.includes('sandwiches-salads line')
		) {
			this.line = true;
		}
		if (this.user.permissions.includes('receive productions')) {
			this.approveProductions = true;
		}
		if (this.user.permissions.includes('packing orders')) {
			this.packing = true;
		}
		if (this.user.permissions.includes('receive dispatch')) {
			this.driver = true;
		}
		if (this.user.permissions.includes('receive orders')) {
			this.delivery = true;
		}
	}
}

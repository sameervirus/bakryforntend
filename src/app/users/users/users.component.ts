import { Component, OnInit } from '@angular/core';

import { NotificationService, UsersService } from '../../_services';

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
	users: any;
	usersOrigin: any;
	clients: any;
	cars: any;
	roles: any;
	rolesOrigin: any;
	branches: any = [];
	p: number = 1;
	user = {
		id: 0,
		name: '',
		name_ar: '',
		email: '',
		username: '',
		password: '',
		branch_id: 0,
		division_id: 0,
		mobile1: '',
		mobile2: '',
		landline: '',
		title: '',
		title_ar: '',
		password_confirmation: '',
		client_id: 999,
		role: 0,
		car_id: 0,
	};
	loading = false;
	isUpdate = false;
	isClient = false;

	constructor(
		private usersService: UsersService,
		private notificationService: NotificationService
	) {}

	ngOnInit(): void {
		this.getUsers();
	}

	getUsers() {
		this.usersService.getUsers().subscribe((res) => {
			this.users = res.body.result.users;
			this.usersOrigin = res.body.result.users;
			this.clients = res.body.result.clients;
			this.cars = res.body.result.cars;
			if (res.body.result.permission != 'all') {
				this.branches = res.body.result.clients[0].branches;
				this.isClient = true;
			}
			this.roles = res.body.result.roles;
			this.rolesOrigin = res.body.result.roles;
		});
	}

	onClientChange(e: any) {
		if (e) {
			this.user.client_id = e.id;
			this.branches = e.branches;
			this.user.branch_id = e.branches[0].id;
			this.roles = this.rolesOrigin.filter(
				(item: any) => item.client_id == e.id
			);
		} else {
			this.roles = this.rolesOrigin;
			this.branches = [];
		}
	}

	onStatusChange(e: any) {
		if (e && e.id != 0) {
			this.users = this.usersOrigin.filter(
				(item: any) => item.client_id == e.id
			);
		} else {
			this.users = this.usersOrigin;
		}
	}

	onSubmit(userForm: any) {
		this.loading = true;
		this.usersService
			.addUser(
				this.user.id,
				this.user.name,
				this.user.name_ar,
				this.user.email,
				this.user.username,
				this.user.password,
				this.user.branch_id,
				this.user.branch_id,
				this.user.mobile1,
				this.user.mobile2,
				this.user.landline,
				this.user.title,
				this.user.title_ar,
				this.user.password_confirmation,
				this.user.client_id,
				this.user.role,
				this.user.car_id
			)
			.subscribe(
				(res) => {
					if (this.isUpdate) {
						this.users = res.body.result.users;
						this.showNotify('Your Item Successfuly Updated', 'success');
						this.isUpdate = false;
						this.user.id = 0;
					} else {
						this.users.push(res.body);
						this.showNotify('Your Item Successfuly Added', 'success');
					}
					userForm.reset();
					this.loading = false;
				},
				(err) => {
					let message = '';
					if (err.status == 422) {
						message = JSON.stringify(err.error.errors);
					} else {
						console.log(err);
						message = 'Server is down please try again';
					}
					this.showNotify(message, 'error');
					this.loading = false;
				}
			);
	}

	editUser(
		id: number,
		name: string,
		name_ar: string,
		email: string,
		username: string,
		branch_id: number,
		division_id: number,
		mobile1: string,
		mobile2: string,
		landline: string,
		title: string,
		title_ar: string,
		client_id: number,
		role: number,
		car_id: number
	) {
		let client = this.clients.filter((item: any) => item.id == client_id);
		this.branches = client[0].branches;
		this.isUpdate = true;
		this.user.id = id;
		this.user.name = name;
		this.user.name_ar = name_ar;
		this.user.email = email;
		this.user.username = username;
		this.user.branch_id = branch_id;
		this.user.client_id = client_id;
		this.user.division_id = division_id;
		this.user.mobile1 = mobile1;
		this.user.mobile2 = mobile2;
		this.user.landline = landline;
		this.user.title = title;
		this.user.title_ar = title_ar;
		this.user.role = role;
		this.user.car_id = car_id;
	}

	resetFrom(userForm: any) {
		userForm.reset();
		this.isUpdate = false;
		this.user.id = 0;
	}

	showNotify(message: string, status: string) {
		this.notificationService.sendMessages(message, status, true, {
			text: 'Ok',
		});
	}
}

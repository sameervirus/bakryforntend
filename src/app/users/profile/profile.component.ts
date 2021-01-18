import { Component, OnInit } from '@angular/core';

import { NotificationService, UsersService } from '../../_services';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
	loading: boolean = false;
	branches: any;
	type: string = 'single';
	userData: any;

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
		client: '',
		branch: '',
		client_id: 0,
		role: 0,
		branch_pass: '',
	};

	constructor(
		private usersService: UsersService,
		private notificationService: NotificationService,
		private permissionsService: NgxPermissionsService
	) {}

	ngOnInit(): void {
		if (localStorage.getItem('currentUser')) {
			this.userData = JSON.parse(localStorage.getItem('currentUser')!);
			this.user = this.userData.user;
			const perm = this.userData.user.permissions;
			if (perm.includes('change branch')) this.getBranches();
			this.permissionsService.loadPermissions(perm);
		}
	}

	getBranches() {
		this.usersService
			.getBranches()
			.subscribe((res) => (this.branches = res.body.data));
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
				this.type,
				this.user.branch_pass
			)
			.subscribe(
				(res) => {
					this.user = res.body.data;
					this.userData.user = res.body.data;
					localStorage.setItem('currentUser', JSON.stringify(this.userData));
					this.showNotify('Your Item Successfuly Updated', 'success');
					this.loading = false;
				},
				(err) => {
					let message = '';
					if (err.status == 400) {
						message = JSON.stringify(err.error.message);
						this.showNotify(message, 'error');
					}
					if (err.status == 422) {
						message = JSON.stringify(err.error.errors);
						this.showNotify(message, 'error');
					}

					this.loading = false;
				}
			);
	}

	showNotify(message: string, status: string) {
		this.notificationService.sendMessages(message, status, true, {
			text: 'Ok',
		});
	}
}

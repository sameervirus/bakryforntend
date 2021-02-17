import { Component, OnInit } from '@angular/core';

import { NotificationService, UsersService } from '../../_services';

@Component({
	selector: 'app-branches',
	templateUrl: './branches.component.html',
	styleUrls: ['./branches.component.css'],
})
export class BranchesComponent implements OnInit {
	loading: boolean = false;
	branches: any;
	orginBranches: any;
	p: number = 1;

	constructor(
		private usersService: UsersService,
		private notificationService: NotificationService
	) {}

	ngOnInit(): void {
		this.getBranches();
	}

	getBranches() {
		this.usersService.getBranches().subscribe((res) => {
			this.branches = res.body.data;
			this.orginBranches = res.body.data;
		});
	}

	onSearchChange(e: any) {
		let str = e.target.value;
		this.branches = this.orginBranches.filter(
			(a: any) =>
				a.name.toLowerCase().includes(str.toLowerCase()) ||
				a.code.toLowerCase().includes(str.toLowerCase()) ||
				a.arabic_name.toLowerCase().includes(str.toLowerCase())
		);
	}

	changePassword(id: number, password: any) {
		console.log(password);
		if (id) {
			this.usersService.changePassword(id, password.value).subscribe(
				(res) => {
					this.notificationService.sendMessages(
						'Branch password updated!',
						'success',
						true,
						{ text: 'OK' }
					);
				},
				(err) => {
					let message = '';
					if (err.status == 422) {
						message = JSON.stringify(err.error.errors);
					} else {
						console.log(err);
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

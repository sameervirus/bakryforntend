import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../_helpers';

import { RolesComponent } from './roles/roles.component';
import { UsersComponent } from './users/users.component';
import { ProfileComponent } from './profile/profile.component';
import { BranchesComponent } from './branches/branches.component';

const routes: Routes = [
	{
		path: '',
		component: UsersComponent,
		canActivate: [AuthGuard],
		data: {
			breadcrumb: 'Users',
		},
	},
	{
		path: 'roles',
		component: RolesComponent,
		canActivate: [AuthGuard],
		data: {
			breadcrumb: 'Roles',
		},
	},
	{
		path: 'profile',
		component: ProfileComponent,
		canActivate: [AuthGuard],
		data: {
			breadcrumb: 'Profile',
		},
	},
	{
		path: 'branches',
		component: BranchesComponent,
		canActivate: [AuthGuard],
		data: {
			breadcrumb: 'Branches',
		},
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class UsersRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../_helpers';

import { ActivesComponent } from './actives/actives.component';
import { CreateComponent } from './create/create.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { HistoryComponent } from './history/history.component';

const routes: Routes = [
	{ path: '', component: ActivesComponent, canActivate: [AuthGuard] },
	{
		path: 'create',
		component: CreateComponent,
		canActivate: [AuthGuard],
		data: {
			breadcrumb: 'Create Orders',
		},
	},
	{
		path: 'create/:id',
		component: CreateComponent,
		canActivate: [AuthGuard],
		data: {
			breadcrumb: 'Edit Orders',
		},
	},
	{
		path: 'actives',
		component: ActivesComponent,
		canActivate: [AuthGuard],
		data: {
			breadcrumb: 'Actives Orders',
		},
	},
	{
		path: 'view/:id',
		component: ViewComponent,
		canActivate: [AuthGuard],
		data: {
			breadcrumb: 'View Orders',
		},
	},
	{
		path: 'edit/:id',
		component: EditComponent,
		canActivate: [AuthGuard],
		data: {
			breadcrumb: 'Edit Orders',
		},
	},
	{
		path: 'reviews',
		component: ReviewsComponent,
		canActivate: [AuthGuard],
		data: {
			breadcrumb: 'Review Orders',
		},
	},
	{
		path: 'history',
		component: HistoryComponent,
		canActivate: [AuthGuard],
		data: {
			breadcrumb: 'Orders History',
		},
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class OrdersRoutingModule {}

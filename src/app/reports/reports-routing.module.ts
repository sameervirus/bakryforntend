import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../_helpers';

import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
	{ path: '', component: OrdersComponent, canActivate: [AuthGuard] },
	{
		path: 'orders',
		component: OrdersComponent,
		canActivate: [AuthGuard],
		data: {
			breadcrumb: 'Orders Details',
		},
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ReportsRoutingModule {}

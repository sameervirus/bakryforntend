import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../_helpers';

import { OrdersListComponent } from './orders-list/orders-list.component';
import { ProductionComponent } from './production/production.component';
import { DispatchingComponent } from './dispatching/dispatching.component';

const routes: Routes = [
	{ path: '', component: OrdersListComponent, canActivate: [AuthGuard] },
	{
		path: 'list',
		component: OrdersListComponent,
		canActivate: [AuthGuard],
		data: {
			breadcrumb: 'Orders List',
		},
	},
	{
		path: 'production',
		component: ProductionComponent,
		canActivate: [AuthGuard],
		data: {
			breadcrumb: 'Production List',
		},
	},
	{
		path: 'dispatching/:id',
		component: DispatchingComponent,
		canActivate: [AuthGuard],
		data: {
			breadcrumb: 'Packing Order',
		},
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class DispatchRoutingModule {}

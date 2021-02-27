import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../_helpers';

import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';

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
	{
		path: 'products',
		component: ProductsComponent,
		canActivate: [AuthGuard],
		data: {
			breadcrumb: 'Products Details',
		},
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ReportsRoutingModule {}

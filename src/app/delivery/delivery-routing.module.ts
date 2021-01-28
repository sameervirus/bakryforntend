import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../_helpers';

import { ReceiveDispatchComponent } from './receive-dispatch/receive-dispatch.component';
import { ReceivingOrderComponent } from './receiving-order/receiving-order.component';

const routes: Routes = [
	{ path: '', component: ReceiveDispatchComponent, canActivate: [AuthGuard] },
	{
		path: 'receive',
		component: ReceiveDispatchComponent,
		canActivate: [AuthGuard],
		data: {
			breadcrumb: 'Receive Dispatches',
		},
	},
	{
		path: 'receiving',
		component: ReceivingOrderComponent,
		canActivate: [AuthGuard],
		data: {
			breadcrumb: 'Receiving Orders',
		},
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class DeliveryRoutingModule {}

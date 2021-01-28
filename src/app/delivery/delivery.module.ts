import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DeliveryRoutingModule } from './delivery-routing.module';

// Plugin
import { NgxPermissionsModule } from 'ngx-permissions';
import { NgxPaginationModule } from 'ngx-pagination';

import { ReceiveDispatchComponent } from './receive-dispatch/receive-dispatch.component';
import { ReceivingOrderComponent } from './receiving-order/receiving-order.component';

@NgModule({
	declarations: [ReceiveDispatchComponent, ReceivingOrderComponent],
	imports: [
		CommonModule,
		DeliveryRoutingModule,
		FormsModule,
		NgxPaginationModule,
		NgxPermissionsModule.forChild(),
	],
})
export class DeliveryModule {}

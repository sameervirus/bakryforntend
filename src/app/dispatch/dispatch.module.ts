import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DispatchRoutingModule } from './dispatch-routing.module';

// Plugin
import { NgxPermissionsModule } from 'ngx-permissions';
import { NgSelectModule } from '@ng-select/ng-select';

import { OrdersListComponent } from './orders-list/orders-list.component';
import { ProductionComponent } from './production/production.component';
import { DispatchingComponent } from './dispatching/dispatching.component';

@NgModule({
	declarations: [
		DispatchingComponent,
		OrdersListComponent,
		ProductionComponent,
	],
	imports: [
		CommonModule,
		DispatchRoutingModule,
		FormsModule,
		NgSelectModule,
		NgxPermissionsModule.forChild(),
	],
})
export class DispatchModule {}

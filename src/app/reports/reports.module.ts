import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ReportsRoutingModule } from './reports-routing.module';
import { CustomRouteReuseStrategy } from '../_helpers';

// Plugin
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPermissionsModule } from 'ngx-permissions';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';

@NgModule({
	declarations: [OrdersComponent, ProductsComponent],
	imports: [
		CommonModule,
		NgxPaginationModule,
		NgSelectModule,
		NgxPermissionsModule.forChild(),
		AngularMyDatePickerModule,
		FormsModule,
		ReportsRoutingModule,
	],
	providers: [
		{ provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy },
	],
})
export class ReportsModule {}

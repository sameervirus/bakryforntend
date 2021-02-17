import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { OrdersRoutingModule } from './orders-routing.module';
import { CustomRouteReuseStrategy } from '../_helpers';
// Plugin
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPermissionsModule } from 'ngx-permissions';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';

import { ActivesComponent } from './actives/actives.component';
import { CreateComponent } from './create/create.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { HistoryComponent } from './history/history.component';
import { ProductionsComponent } from './productions/productions.component';
import { ProductionComponent } from './production/production.component';
import { ReviewBranchesComponent } from './review-branches/review-branches.component';
import { AllComponent } from './all/all.component';
import { ModifyComponent } from './modify/modify.component';

@NgModule({
	declarations: [
		ActivesComponent,
		CreateComponent,
		ViewComponent,
		EditComponent,
		ReviewsComponent,
		HistoryComponent,
		ProductionsComponent,
		ProductionComponent,
		ReviewBranchesComponent,
		AllComponent,
		ModifyComponent,
	],
	imports: [
		CommonModule,
		OrdersRoutingModule,
		NgxPaginationModule,
		NgSelectModule,
		AngularMyDatePickerModule,
		FormsModule,
		NgxPermissionsModule.forChild(),
	],
	exports: [
		ActivesComponent,
		CreateComponent,
		ViewComponent,
		EditComponent,
		ReviewsComponent,
		HistoryComponent,
	],
	providers: [
		{ provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy },
	],
})
export class OrdersModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteReuseStrategy } from '@angular/router';

import { OrdersRoutingModule } from './orders-routing.module';
import { CustomRouteReuseStrategy } from '../_helpers';
// Plugin
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPermissionsModule } from 'ngx-permissions';

import { ActivesComponent } from './actives/actives.component';
import { CreateComponent } from './create/create.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { HistoryComponent } from './history/history.component';
import { ProductionsComponent } from './productions/productions.component';
import { ProductionComponent } from './production/production.component';

@NgModule({
  declarations: [  	
    ActivesComponent, CreateComponent, ViewComponent, EditComponent, ReviewsComponent, HistoryComponent, ProductionsComponent, ProductionComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    NgxPaginationModule,
    NgSelectModule,
    NgxPermissionsModule.forChild()
  ],
  exports: [
  	ActivesComponent, CreateComponent, ViewComponent, EditComponent, ReviewsComponent, HistoryComponent
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy }
  ]
})
export class OrdersModule { }

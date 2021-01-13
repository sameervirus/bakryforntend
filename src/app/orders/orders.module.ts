import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
// Plugin
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';

import { ActivesComponent } from './actives/actives.component';
import { CreateComponent } from './create/create.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { HistoryComponent } from './history/history.component';

@NgModule({
  declarations: [  	
    ActivesComponent, CreateComponent, ViewComponent, EditComponent, ReviewsComponent, HistoryComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    NgxPaginationModule,
    NgSelectModule
  ],
  exports: [
  	ActivesComponent
  ]
})
export class OrdersModule { }

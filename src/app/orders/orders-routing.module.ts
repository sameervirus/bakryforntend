import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../_helpers';

import { ActivesComponent } from './actives/actives.component';
import { CreateComponent } from './create/create.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { ReviewsComponent } from './reviews/reviews.component';

const routes: Routes = [
  { path: '', component: ActivesComponent, canActivate: [AuthGuard] },
  { path: 'create', component: CreateComponent, canActivate: [AuthGuard] },
  { path: 'actives', component: ActivesComponent, canActivate: [AuthGuard] },
  { path: 'view/:id', component: ViewComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: EditComponent, canActivate: [AuthGuard] },
  { path: 'reviews', component: ReviewsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }

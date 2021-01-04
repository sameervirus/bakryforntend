import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './_helpers';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CodingComponent } from './coding/coding/coding.component';
import { CategoryComponent } from './coding/category/category.component';
import { ProductsComponent } from './coding/products/products.component';
import { CitiesComponent } from './coding/cities/cities.component';
import { DistributionsComponent } from './coding/distributions/distributions.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'coding', component: CodingComponent, canActivate: [AuthGuard] },
  { path: 'coding/category', component: CategoryComponent, canActivate: [AuthGuard] },
  { path: 'coding/products', component: ProductsComponent, canActivate: [AuthGuard] },
  { path: 'coding/cities', component: CitiesComponent, canActivate: [AuthGuard] },
  { path: 'coding/distributions', component: DistributionsComponent, canActivate: [AuthGuard] },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

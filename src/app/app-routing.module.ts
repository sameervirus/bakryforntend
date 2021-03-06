import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './_helpers';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CodingComponent } from './coding/coding/coding.component';
import { CategoryComponent } from './coding/category/category.component';
import { PackingsComponent } from './coding/packings/packings.component';
import { ProductsComponent } from './coding/products/products.component';
import { CitiesComponent } from './coding/cities/cities.component';
import { DistrictsComponent } from './coding/districts/districts.component';
import { DistributionsComponent } from './coding/distributions/distributions.component';
import { CarsComponent } from './coding/cars/cars.component';
import { ClientsComponent } from './coding/clients/clients.component';
import { BranchesComponent } from './coding/branches/branches.component';
import { ProductionsComponent } from './coding/productions/productions.component';
import { PrintComponent } from './components/print/print.component';

const routes: Routes = [
	{ path: '', component: HomeComponent, canActivate: [AuthGuard] },
	{ path: 'login', component: LoginComponent },
	{ path: 'coding', component: CodingComponent, canActivate: [AuthGuard] },
	{
		path: 'coding/production-lines',
		component: ProductionsComponent,
		canActivate: [AuthGuard],
		data: {
			breadcrumb: 'Coding Production Lines',
		},
	},
	{
		path: 'coding/category',
		component: CategoryComponent,
		canActivate: [AuthGuard],
		data: {
			breadcrumb: 'Coding Category',
		},
	},
	{
		path: 'coding/packings',
		component: PackingsComponent,
		canActivate: [AuthGuard],
		data: {
			breadcrumb: 'Coding Packings',
		},
	},
	{
		path: 'coding/products',
		component: ProductsComponent,
		canActivate: [AuthGuard],
		data: {
			breadcrumb: 'Coding Products',
		},
	},
	{
		path: 'coding/cities',
		component: CitiesComponent,
		canActivate: [AuthGuard],
		data: {
			breadcrumb: 'Coding Cities',
		},
	},
	{
		path: 'coding/districts',
		component: DistrictsComponent,
		canActivate: [AuthGuard],
		data: {
			breadcrumb: 'Coding Districts',
		},
	},
	{
		path: 'coding/distributions',
		component: DistributionsComponent,
		canActivate: [AuthGuard],
		data: {
			breadcrumb: 'Coding Distributions',
		},
	},
	{ path: 'coding/cars', component: CarsComponent, canActivate: [AuthGuard] },
	{
		path: 'coding/clients',
		component: ClientsComponent,
		canActivate: [AuthGuard],
		data: {
			breadcrumb: 'Coding Clients',
		},
	},
	{
		path: 'coding/branches',
		component: BranchesComponent,
		canActivate: [AuthGuard],
		data: {
			breadcrumb: 'Coding Branches',
		},
	},
	{
		path: 'print/:type/:id',
		component: PrintComponent,
		canActivate: [AuthGuard],
		data: {
			breadcrumb: 'Print',
		},
	},

	// orther modules
	{
		path: 'orders',
		loadChildren: () =>
			import('./orders/orders.module').then((m) => m.OrdersModule),
	},
	{
		path: 'users',
		loadChildren: () =>
			import('./users/users.module').then((m) => m.UsersModule),
	},
	{
		path: 'dispatch',
		loadChildren: () =>
			import('./dispatch/dispatch.module').then((m) => m.DispatchModule),
	},
	{
		path: 'delivery',
		loadChildren: () =>
			import('./delivery/delivery.module').then((m) => m.DeliveryModule),
	},
	{
		path: 'reports',
		loadChildren: () =>
			import('./reports/reports.module').then((m) => m.ReportsModule),
	},

	// otherwise redirect to home
	{ path: '**', redirectTo: '' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}

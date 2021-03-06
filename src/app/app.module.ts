import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';
import { DispatchModule } from './dispatch/dispatch.module';
import { DeliveryModule } from './delivery/delivery.module';
import { ReportsModule } from './reports/reports.module';

// Plugin
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPermissionsModule } from 'ngx-permissions';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxBarcodeModule } from 'ngx-barcode';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { ExcelService } from './_services/';
import { BnNgIdleService } from 'bn-ng-idle';

// Services
import { JwtInterceptor, ErrorInterceptor } from './_helpers';

//Directives
import { OnlynumberDirective } from './directives/onlynumber.directive';

// Component
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './navbar/layout/layout.component';
import { SidebarComponent } from './sidebar/sidebar/sidebar.component';
import { FooterComponent } from './footer/footer/footer.component';
import { CodingComponent } from './coding/coding/coding.component';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './coding/category/category.component';
import { LoginComponent } from './login/login.component';
import { NotificationComponent } from './components/notification/notification.component';
import { ProductsComponent } from './coding/products/products.component';
import { ClientsComponent } from './coding/clients/clients.component';
import { BranchesComponent } from './coding/branches/branches.component';
import { DistributionsComponent } from './coding/distributions/distributions.component';
import { CarsComponent } from './coding/cars/cars.component';
import { CitiesComponent } from './coding/cities/cities.component';
import { DistrictsComponent } from './coding/districts/districts.component';
import { PackingsComponent } from './coding/packings/packings.component';
import { ProductionsComponent } from './coding/productions/productions.component';
import { PrintComponent } from './components/print/print.component';

@NgModule({
	declarations: [
		AppComponent,
		LayoutComponent,
		SidebarComponent,
		FooterComponent,
		CodingComponent,
		HomeComponent,
		CategoryComponent,
		LoginComponent,
		NotificationComponent,
		ProductsComponent,
		ClientsComponent,
		BranchesComponent,
		DistributionsComponent,
		CarsComponent,
		CitiesComponent,
		DistrictsComponent,
		OnlynumberDirective,
		PackingsComponent,
		ProductionsComponent,
		PrintComponent,
	],
	imports: [
		CommonModule,
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		NgxPaginationModule,
		NgSelectModule,
		OrdersModule,
		UsersModule,
		DispatchModule,
		DeliveryModule,
		ReportsModule,
		QRCodeModule,
		NgxBarcodeModule,
		AngularMyDatePickerModule,
		NgxPermissionsModule.forRoot(),
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
		ExcelService,
		BnNgIdleService,
	],
	bootstrap: [AppComponent],
})
export class AppModule {}

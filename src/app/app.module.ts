import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Plugin
import {NgxPaginationModule} from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';

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
    OnlynumberDirective
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
    NgSelectModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

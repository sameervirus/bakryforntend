import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { UsersRoutingModule } from './users-routing.module';

// Plugin
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPermissionsModule } from 'ngx-permissions';
import { RolesComponent } from './roles/roles.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [RolesComponent, UsersComponent],
  imports: [
  	FormsModule,
    CommonModule,
    UsersRoutingModule,
    NgxPaginationModule,
    NgSelectModule,
    NgxPermissionsModule.forChild()
  ],
  exports: [
  	RolesComponent
  ]
})
export class UsersModule { }

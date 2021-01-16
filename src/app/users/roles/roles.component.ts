import { Component, OnInit } from '@angular/core';

import { NotificationService, UsersService } from '../../_services';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  p: number = 1;
  roles:any;
  permissions:any;
  role = {id:0, name:'', name_ar:'', permission:[0]};
  loading = false;
  isUpdate = false;
  
  constructor(
    private usersService : UsersService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles() {
    this.usersService.getRoles().subscribe(res => { 
      this.roles = res.body.result.roles; 
      this.permissions = res.body.result.permissions;
    });
  }

  onSubmit(roleForm:any) {
    this.loading = true;
    this.usersService.addRole(this.role.id, this.role.name, this.role.name_ar, 
      this.role.permission).subscribe(
      res => {
        if(this.isUpdate) {
          this.roles = res.body.result.roles; 
          this.showNotify('Your Item Successfuly Updated', 'success');
        } else {
          this.roles = res.body.result.roles;
          this.showNotify('Your Item Successfuly Added', 'success');
        }
          this.resetFrom(roleForm);
          this.loading = false;
          
      },
      err => {
        let message = '';
        if(err.status == 422) {
          for (const property in err.error.errors) {
            message += `${property}: ${err.error.errors[property]}`;
          }
        } else {
          message = 'Server is down please try again';
        }
        this.showNotify(message,'error');
        this.loading = false;
      }
      );
  }

  getPermissions() {
    this.usersService.getPermissions().subscribe(res => { 
      this.permissions = res.body.map((item:any) => ({...item, checked:false }))
    });
  }

  onChangePermission(event:any, cat:any){
    if(event.target.checked) {
      this.role.permission.push(cat.id);
    } else {
      const index = this.role.permission.indexOf(cat.id);
      if (index > -1) {
        this.role.permission.splice(index, 1);
      }
    }
  }

  editRole(id:number, name:string, name_ar:string, permission:any) {
    this.role.permission=[0];
    this.isUpdate = true;
    this.role.id = id;
    this.role.name = name;
    this.role.name_ar = name_ar;
    this.role.permission = permission;
    for (var i = 0; i < this.permissions.length; ++i) {
      if(permission.includes(this.permissions[i].id)) {
        this.permissions[i].checked = true;
      }
    }
    this.permissions = this.permissions;
  }

  resetFrom(roleForm:any) {
    roleForm.reset();
    this.isUpdate=false;
    this.role.id=0;
    this.role.permission=[0];
    for (var i = 0; i < this.permissions.length; ++i) {
      this.permissions[i].checked = false;
    }
  }

  showNotify(message:string, status:string) {
    this.notificationService.sendMessages(
      message,
      status, 
      true, 
      {'text':'Ok'}, 
    );
  }

}

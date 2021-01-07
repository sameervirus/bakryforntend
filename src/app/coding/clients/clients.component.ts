import { Component, OnInit } from '@angular/core';

import { CodingService, NotificationService } from '../../_services';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients:any;
  categories:any;
  client = {id:0, name:'', name_ar:'', category:[0]};
  loading = false;
  isUpdate = false;
  
  constructor(
    private codingService : CodingService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.getClients();
    this.getCategories();
  }

  onSubmit(clientForm:any) {
    this.loading = true;
    this.codingService.addClient(this.client.id, this.client.name, this.client.name_ar, this.client.category).subscribe(
      res => {
        if(this.isUpdate) {
          this.clients = res.body;
          this.showNotify('Your Item Successfuly Updated', 'success');
        } else {
          this.clients.push(res.body);
          this.showNotify('Your Item Successfuly Added', 'success');
        }
          this.resetFrom(clientForm);
          this.loading = false;
          
      },
      err => {
        let message = '';
        if(err.status == 422) {
          message = JSON.stringify(err.error.errors);
        } else {
          message = 'Server is down please try again';
        }
        this.showNotify(message,'error');
        this.loading = false;
      }
      );
  }

  getClients() {
    this.codingService.getClients().subscribe(res => { this.clients = res.body; });
  }

  getCategories() {
    this.codingService.getProductCategory().subscribe(res => { 
      this.categories = res.body.map((item:any) => ({...item, checked:false }))
    });
  }

  onChangeCategory(event:any, cat:any){
    console.log(this.client.category)
    if(event.target.checked) {
      this.client.category.push(cat.id);
    } else {
      const index = this.client.category.indexOf(cat.id);
      if (index > -1) {
        this.client.category.splice(index, 1);
      }
    }
    console.log(this.client.category)
  }

  editClient(id:number, name:string, name_ar:string, category:any) {
    this.client.category=[0];
    this.isUpdate = true;
    this.client.id = id;
    this.client.name = name;
    this.client.name_ar = name_ar;
    this.client.category = category;
    for (var i = 0; i < this.categories.length; ++i) {
      if(category.includes(this.categories[i].id)) {
        this.categories[i].checked = true;
      }
    }
    this.categories = this.categories;
  }

  resetFrom(clientForm:any) {
    clientForm.reset();
    this.isUpdate=false;
    this.client.id=0;
    this.client.category=[0];
    for (var i = 0; i < this.categories.length; ++i) {
      this.categories[i].checked = false;
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

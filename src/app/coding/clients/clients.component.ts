import { Component, OnInit } from '@angular/core';

import { CodingService, NotificationService } from '../../_services';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients:any;
  client = {id:0, name:'', name_ar:''};
  loading = false;
  isUpdate = false;
  
  constructor(
    private codingService : CodingService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.getClients();
  }

  onSubmit(clientForm:any) {
    this.loading = true;
    this.codingService.addClient(this.client.id, this.client.name, this.client.name_ar).subscribe(
      res => {
        if(this.isUpdate) {
          this.clients = res.body;
          this.showNotify('Your Item Successfuly Updated', 'success');
          this.isUpdate = false;
          this.client.id = 0;
        } else {
          this.clients.push(res.body);
          this.showNotify('Your Item Successfuly Added', 'success');
        }
          clientForm.reset();
          this.loading = false;
          
      },
      err => {
        let message = '';
        if(err.status == 422) {
          message = JSON.stringify(err.error.errors);
        } else {
          console.log(err);
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

  editClient(id:number, name:string, name_ar:string) {
    this.isUpdate = true;
    this.client.id = id;
    this.client.name = name;
    this.client.name_ar = name_ar;
  }

  resetFrom(clientForm:any) {
    clientForm.reset();
    this.isUpdate=false;
    this.client.id=0;
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

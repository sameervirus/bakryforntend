import { Component, OnInit } from '@angular/core';

import { CodingService, NotificationService } from '../../_services';

@Component({
  selector: 'app-productions',
  templateUrl: './productions.component.html',
  styleUrls: ['./productions.component.css']
})
export class ProductionsComponent implements OnInit {

  productions:any;
  p:number = 1;
  production = {id:0, name:'', name_ar:''};
  loading = false;
  isUpdate = false;
  
  constructor(
    private codingService : CodingService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.getProductions();
  }

  onSubmit(productionForm:any) {
    this.loading = true;
    this.codingService.addProduction(this.production.id, this.production.name, this.production.name_ar).subscribe(
      res => {
        if(this.isUpdate) {
          this.productions = res.body;
          this.showNotify('Your Item Successfuly Updated', 'success');
          this.isUpdate = false;
          this.production.id = 0;
        } else {
          this.productions.push(res.body);
          this.showNotify('Your Item Successfuly Added', 'success');
        }
          productionForm.reset();
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

  getProductions() {
    this.codingService.getProductions().subscribe(res => { this.productions = res.body; });
  }

  editProduction(id:number, name:string, name_ar:string) {
    this.isUpdate = true;
    this.production.id = id;
    this.production.name = name;
    this.production.name_ar = name_ar;
  }

  resetFrom(productionForm:any) {
    productionForm.reset();
    this.isUpdate=false;
    this.production.id=0;
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

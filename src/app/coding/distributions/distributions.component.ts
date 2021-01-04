import { Component, OnInit } from '@angular/core';

import { CodingService, NotificationService } from '../../_services';

@Component({
  selector: 'app-distributions',
  templateUrl: './distributions.component.html',
  styleUrls: ['./distributions.component.css']
})
export class DistributionsComponent implements OnInit {

  distributions:any;
  distribution = {id:0, name:'', name_ar:''};
  loading = false;
  isUpdate = false;
  
  constructor(
    private codingService : CodingService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.getdistributions();
  }

  onSubmit(distributionForm:any) {
    this.loading = true;
    this.codingService.addDistribution(this.distribution.id, this.distribution.name, this.distribution.name_ar).subscribe(
      res => {
        if(this.isUpdate) {
          this.distributions = res.body;
          this.showNotify('Your Item Successfuly Updated', 'success');
          this.isUpdate = false;
          this.distribution.id = 0;
        } else {
          this.distributions.push(res.body);
          this.showNotify('Your Item Successfuly Added', 'success');
        }
          distributionForm.reset();
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

  getdistributions() {
    this.codingService.getDistribution().subscribe(res => { this.distributions = res.body; });
  }

  editDistribution(id:number, name:string, name_ar:string) {
    this.isUpdate = true;
    this.distribution.id = id;
    this.distribution.name = name;
    this.distribution.name_ar = name_ar;
  }

  resetFrom(distributionForm:any) {
    distributionForm.reset();
    this.isUpdate=false;
    this.distribution.id=0;
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

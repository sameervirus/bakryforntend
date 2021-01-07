import { Component, OnInit } from '@angular/core';

import { CodingService, NotificationService } from '../../_services';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})
export class BranchesComponent implements OnInit {

  p: number = 1;
  branches:any;
  foreignData:any;
  cities:any;
  districts:any;
  distributions:any;
  clients:any;
  loading = false;
  isUpdate = false;
  branch = {id:0,name:'',
        name_ar:'',
        due_period:'',
		close_time:'',
		client:0,
		city:0,
		district:0,
    distribution:0,
  code:'', vat:true, opening:'',closing:''};

  constructor(    
    private codingService : CodingService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.getBranches();
    this.getForeignData();
  }

  getBranches() {
    this.codingService.getBranches().subscribe(res => { this.branches = res.body; });
  }

  getForeignData() {
  	this.codingService.getForeignData().subscribe(res => {this.foreignData = res.body })
  }

  onSubmit(branchForm:any) {
    this.loading = true;
    this.codingService.addBranch(
      this.branch.id,
      this.branch.name,
      this.branch.name_ar, 
      this.branch.due_period,
      this.branch.close_time,
      this.branch.client,
      this.branch.city,
      this.branch.district,
      this.branch.distribution,
      this.branch.code, this.branch.vat, this.branch.opening,this.branch.closing).subscribe(
      res => {
        if(this.isUpdate) {
          this.branches = res.body;
          this.showNotify('Your Item Successfuly Updated', 'success');
        } else {
          this.branches.push(res.body);
          this.showNotify('Your Item Successfuly Added', 'success');
        }
        branchForm.reset();
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

  editBranch(id:number,name:string, name_ar:string, due_period:string, close_time:string,
    client_id:number, city_id:number, district_id:number, distribution_id:number,
    code:string, vat:boolean, opening:string,closing:string) {
    this.isUpdate = true;
    this.branch.id = id;
    this.branch.name = name;
    this.branch.name_ar = name_ar;
    this.branch.due_period = due_period;
    this.branch.close_time = close_time;
    this.branch.client = client_id;
    this.branch.city = city_id;
    this.branch.district = district_id;
    this.branch.distribution = distribution_id;
    this.branch.code = code;
    this.branch.vat = vat;
    this.branch.opening = opening;
    this.branch.closing = closing;
  }

  resetFrom(branchForm:any) {
    branchForm.reset();
    this.isUpdate=false;
    this.branch.id=0;
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

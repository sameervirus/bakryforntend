import { Component, OnInit } from '@angular/core';

import { CodingService, NotificationService } from '../../_services';

@Component({
  selector: 'app-districts',
  templateUrl: './districts.component.html',
  styleUrls: ['./districts.component.css']
})
export class DistrictsComponent implements OnInit {

  districts:any;
  cities:any;
  district = {id:0, name:'', name_ar:'', city:0};
  loading = false;
  isUpdate = false;
  
  constructor(
    private codingService : CodingService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.getDistricts();
    this.getCities();
  }

  onSubmit(districtForm:any) {
    this.loading = true;
    this.codingService.addDistrict(this.district.id, this.district.name, this.district.name_ar, this.district.city).subscribe(
      res => {
        if(this.isUpdate) {
          this.districts = res.body;
          this.showNotify('Your Item Successfuly Updated', 'success');
          this.isUpdate = false;
          this.district.id = 0;
        } else {
          this.districts.push(res.body);
          this.showNotify('Your Item Successfuly Added', 'success');
        }
          districtForm.reset();
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

  getDistricts() {
    this.codingService.getDistrict().subscribe(res => { this.districts = res.body; });
  }

  getCities() {
    this.codingService.getCities().subscribe(res => { this.cities = res.body; });
  }

  editDistrict(id:number, name:string, name_ar:string, city_id:number) {
    this.isUpdate = true;
    this.district.id = id;
    this.district.name = name;
    this.district.name_ar = name_ar;
    this.district.city = city_id;
  }

  resetFrom(districtForm:any) {
    districtForm.reset();
    this.isUpdate=false;
    this.district.id=0;
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

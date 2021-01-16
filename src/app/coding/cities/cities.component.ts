import { Component, OnInit } from '@angular/core';

import { CodingService, NotificationService } from '../../_services';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {

  cities:any;
  p:number = 1;
  city = {id:0, name:'', name_ar:''};
  loading = false;
  isUpdate = false;
  
  constructor(
    private codingService : CodingService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.getCities();
  }

  onSubmit(cityForm:any) {
    this.loading = true;
    this.codingService.addCity(this.city.id, this.city.name, this.city.name_ar).subscribe(
      res => {
        if(this.isUpdate) {
          this.cities = res.body;
          this.showNotify('Your Item Successfuly Updated', 'success');
          this.isUpdate = false;
          this.city.id = 0;
        } else {
          this.cities.push(res.body);
          this.showNotify('Your Item Successfuly Added', 'success');
        }
          cityForm.reset();
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

  getCities() {
    this.codingService.getCities().subscribe(res => { this.cities = res.body; });
  }

  editCity(id:number, name:string, name_ar:string) {
    this.isUpdate = true;
    this.city.id = id;
    this.city.name = name;
    this.city.name_ar = name_ar;
  }

  resetFrom(cityForm:any) {
    cityForm.reset();
    this.isUpdate=false;
    this.city.id=0;
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

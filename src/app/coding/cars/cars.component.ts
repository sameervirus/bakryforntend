import { Component, OnInit } from '@angular/core';

import { CodingService, NotificationService } from '../../_services';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  distributions:any;
  cars:any;
  car = {id:0, code:'', distribution:0};
  loading = false;
  isUpdate = false;
  
  constructor(
    private codingService : CodingService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.getCars();
    this.getDistribution();
  }

  onSubmit(carForm:any) {
    this.loading = true;
    this.codingService.addCar(this.car.id, this.car.code, this.car.distribution).subscribe(
      res => {
        if(this.isUpdate) {
          this.cars = res.body;
          this.showNotify('Your Item Successfuly Updated', 'success');
          this.isUpdate = false;
          this.car.id = 0;
        } else {
          this.cars.push(res.body);
          this.showNotify('Your Item Successfuly Added', 'success');
        }
          carForm.reset();
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

  getCars() {
    this.codingService.getCars().subscribe(res => { this.cars = res.body; });
  }

  getDistribution() {
    this.codingService.getDistribution().subscribe(res => { this.distributions = res.body; });
  }

  editCar(id:number, code:string, distribution_id:number) {
    this.isUpdate = true;
    this.car.id = id;
    this.car.code = code;
    this.car.distribution = distribution_id;
  }

  resetFrom(carForm:any) {
    carForm.reset();
    this.isUpdate=false;
    this.car.id=0;
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

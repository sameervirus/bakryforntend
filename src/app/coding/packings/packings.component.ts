import { Component, OnInit } from '@angular/core';

import { CodingService, NotificationService } from '../../_services';

@Component({
  selector: 'app-packings',
  templateUrl: './packings.component.html',
  styleUrls: ['./packings.component.css']
})
export class PackingsComponent implements OnInit {

  packings:any;
  p:number = 1;
  packing = {id:0, name:'', name_ar:'', code:'', h:'', w:'', d:'', volume:'', weight:'', max_stock:''};
  loading = false;
  isUpdate = false;
  
  constructor(
    private codingService : CodingService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.getPackings();
  }

  onSubmit(packingForm:any) {
    this.loading = true;
    this.codingService.addPacking(this.packing.id, this.packing.name, this.packing.name_ar, 
    	this.packing.code, this.packing.h, this.packing.w, this.packing.d, 
    	this.packing.volume, this.packing.weight, this.packing.max_stock).subscribe(
      res => {
        if(this.isUpdate) {
          this.packings = res.body;
          this.showNotify('Your Item Successfuly Updated', 'success');
          this.isUpdate = false;
          this.packing.id = 0;
        } else {
          this.packings.push(res.body);
          this.showNotify('Your Item Successfuly Added', 'success');
        }
          packingForm.reset();
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

  getPackings() {
    this.codingService.getPacking().subscribe(res => { this.packings = res.body; });
  }

  editPacking(id:number, name:string, name_ar:string, code:string,
  	h:string, w:string, d:string, volume:string, weight:string, max_stock:string) {
    this.isUpdate = true;
    this.packing.id = id;
    this.packing.name = name;
    this.packing.name_ar = name_ar;
    this.packing.code = code;
    this.packing.h = h;
    this.packing.w = w;
    this.packing.d = d;
    this.packing.volume = volume;
    this.packing.weight = weight;
    this.packing.max_stock = max_stock;
  }

  resetFrom(packingForm:any) {
    packingForm.reset();
    this.isUpdate=false;
    this.packing.id=0;
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

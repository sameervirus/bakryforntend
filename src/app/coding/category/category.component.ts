import { Component, OnInit } from '@angular/core';

import { CodingService, NotificationService } from '../../_services';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories:any;
  productions:any;
  p:number = 1;
  category = {id:0, name:'', name_ar:'', code:'', line:0};
  loading = false;
  isUpdate = false;
  
  constructor(
    private codingService : CodingService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.getProductions();
  }  

  getCategories() {
    this.codingService.getProductCategory().subscribe(res => { this.categories = res.body; });
  }

  getProductions() {
    this.codingService.getProductions().subscribe(res => { this.productions = res.body; });
  }

  onSubmit(categoryForm:any) {
    this.loading = true;
    this.codingService.addCategory(this.category.id, this.category.name, this.category.name_ar, this.category.code, this.category.line).subscribe(
      res => {
        if(this.isUpdate) {
          this.categories = res.body;
          this.showNotify('Your Item Successfuly Updated', 'success');
          this.isUpdate = false;
          this.category.id = 0;
        } else {
          this.categories.push(res.body);
          this.showNotify('Your Item Successfuly Added', 'success');
        }
          categoryForm.reset();
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

  editCategory(id:number, name:string, name_ar:string, code:string, production_line_id:number) {
    this.isUpdate = true;
    this.category.id = id;
    this.category.name = name;
    this.category.name_ar = name_ar;
    this.category.code = code;
    this.category.line = production_line_id;
  }

  resetFrom(categoryForm:any) {
    categoryForm.reset();
    this.isUpdate=false;
    this.category.id=0;
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

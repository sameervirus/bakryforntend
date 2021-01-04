import { Component, OnInit } from '@angular/core';

import { CodingService, NotificationService } from '../../_services';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  p: number = 1;
  products:any;
  categories:any;
  loading = false;
  isUpdate = false;
  product = {id:0,pool_code:'',code:'', category:0,name:'',name_ar:'',price:''};

  constructor(    
    private codingService : CodingService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getProducts() {
    this.codingService.getProducts().subscribe(res => { this.products = res.body; });
  }

  getCategories() {
    this.codingService.getProductCategory().subscribe(res => {this.categories = res.body});
  }

  onSubmit(productForm:any) {
    this.loading = true;
    this.codingService.addProduct(
      this.product.id,
      this.product.pool_code,
      this.product.code, 
      this.product.category,
      this.product.name,
      this.product.name_ar,
      this.product.price).subscribe(
      res => {
        if(this.isUpdate) {
          this.products = res.body;
          this.showNotify('Your Item Successfuly Updated', 'success');
        } else {
          this.products.push(res.body);
          this.showNotify('Your Item Successfuly Added', 'success');
        }
        productForm.reset();
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

  editProduct(id:number, pool_code:string, code:string, category_id:number, name:string, name_ar:string, price:string) {
    this.isUpdate = true;
    this.product.id = id;
    this.product.pool_code = pool_code;
    this.product.code = code;
    this.product.category = category_id;
    this.product.name = name;
    this.product.name_ar = name_ar;
    this.product.price = price;
  }

  resetFrom(productForm:any) {
    productForm.reset();
    this.isUpdate=false;
    this.product.id=0;
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

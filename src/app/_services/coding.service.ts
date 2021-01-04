import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CodingService {

  constructor(private http: HttpClient) { }

	getProductCategory(): Observable<any> {    
		return this.http.get<any>('categories', {observe : 'response'});
  }

  addCategory(id:number, name:string,name_ar:string): Observable<any> {
    if(id === 0 ) {
      return this.http.post<any>('categories', {name: name, name_ar: name_ar}, {observe : 'response'});
    } else {
      return this.http.put<any>('categories/' + id, {name: name, name_ar: name_ar}, {observe : 'response'});
    }
    
  }

  getProducts(): Observable<any> {
    return this.http.get<any>('products', {observe : 'response'});
  }

  addProduct(id:number, pool_code:string,code:string, category:number,name:string,name_ar:string,price:string) {
    if(id === 0 ) {
      return this.http.post<any>('products', {
        pool_code:pool_code,
        code:code, 
        category_id:category,
        name:name,
        name_ar:name_ar,
        price:price}, {observe : 'response'});
    } else {
      return this.http.put<any>('products/' + id,  {
        pool_code:pool_code,
        code:code, 
        category_id:category,
        name:name,
        name_ar:name_ar,
        price:price}, {observe : 'response'});
    }
  }

  getDistribution(): Observable<any> {    
		return this.http.get<any>('distributions', {observe : 'response'});
  }

  addDistribution(id:number, name:string,name_ar:string): Observable<any> {
    if(id === 0 ) {
      return this.http.post<any>('distributions', {name: name, name_ar: name_ar}, {observe : 'response'});
    } else {
      return this.http.put<any>('distributions/' + id, {name: name, name_ar: name_ar}, {observe : 'response'});
    }
    
  }

  getProductCity(): Observable<any> {    
		return this.http.get<any>('cities', {observe : 'response'});
  }

  addCity(id:number, name:string,name_ar:string): Observable<any> {
    if(id === 0 ) {
      return this.http.post<any>('cities', {name: name, name_ar: name_ar}, {observe : 'response'});
    } else {
      return this.http.put<any>('cities/' + id, {name: name, name_ar: name_ar}, {observe : 'response'});
    }
    
  }
  
}

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

  addCategory(id:number, name:string,name_ar:string, code:string): Observable<any> {
    if(id === 0 ) {
      return this.http.post<any>('categories', {name: name, name_ar: name_ar, code:code}, {observe : 'response'});
    } else {
      return this.http.put<any>('categories/' + id, {name: name, name_ar: name_ar, code:code}, {observe : 'response'});
    }
    
  }

  getProducts(): Observable<any> {
    return this.http.get<any>('products', {observe : 'response'});
  }

  addProduct(id:number, pool_code:string,code:string, category:number,name:string,
    name_ar:string,price:string, vat:number, client_code:null) {
    if(id === 0 ) {
      return this.http.post<any>('products', {
        pool_code:pool_code,
        code:code, 
        category_id:category,
        name:name,
        name_ar:name_ar,
        price:price,
        vat:vat, client_code:client_code}, {observe : 'response'});
    } else {
      return this.http.put<any>('products/' + id,  {
        pool_code:pool_code,
        code:code, 
        category_id:category,
        name:name,
        name_ar:name_ar,
        price:price,
        vat:vat, client_code:client_code}, {observe : 'response'});
    }
  }

  getDistribution(): Observable<any> {    
		return this.http.get<any>('distributions', {observe : 'response'});
  }

  addDistribution(id:number, name:string,name_ar:string, code:string, district:number): Observable<any> {
    if(id === 0 ) {
      return this.http.post<any>('distributions', {name: name, name_ar: name_ar, code:code,district_id:district}, {observe : 'response'});
    } else {
      return this.http.put<any>('distributions/' + id, {name: name, name_ar: name_ar, code:code,district_id:district}, {observe : 'response'});
    }
    
  }

  getCities(): Observable<any> {    
		return this.http.get<any>('cities', {observe : 'response'});
  }

  addCity(id:number, name:string,name_ar:string): Observable<any> {
    if(id === 0 ) {
      return this.http.post<any>('cities', {name: name, name_ar: name_ar}, {observe : 'response'});
    } else {
      return this.http.put<any>('cities/' + id, {name: name, name_ar: name_ar}, {observe : 'response'});
    }
    
  }

  getDistrict(): Observable<any> {    
    return this.http.get<any>('districts', {observe : 'response'});
  }

  addDistrict(id:number, name:string,name_ar:string, city_id:number, code:string): Observable<any> {
    if(id === 0 ) {
      return this.http.post<any>('districts', {name: name, name_ar: name_ar, city_id: city_id, code:code}, {observe : 'response'});
    } else {
      return this.http.put<any>('districts/' + id, {name: name, name_ar: name_ar, city_id:city_id, code:code}, {observe : 'response'});
    }
    
  }

  getCars(): Observable<any> {    
    return this.http.get<any>('cars', {observe : 'response'});
  }

  addCar(id:number, code:string, distribution_id:number): Observable<any> {
    if(id === 0 ) {
      return this.http.post<any>('cars', {code: code, distribution_id: distribution_id}, {observe : 'response'});
    } else {
      return this.http.put<any>('cars/' + id, {code: code, distribution_id:distribution_id}, {observe : 'response'});
    }
    
  }

  // Clients Coding
  getClients(): Observable<any> {    
    return this.http.get<any>('clients', {observe : 'response'});
  }

  addClient(id:number, name:string,name_ar:string, category:any, com_reg:string, 
    email:string, person:string): Observable<any> {
    if(id === 0 ) {
      return this.http.post<any>('clients', {name: name, name_ar: name_ar, category:category, 
      com_reg:com_reg, email:email, person:person}, {observe : 'response'});
    } else {
      return this.http.put<any>('clients/' + id, {name: name, name_ar: name_ar, category:category, 
        com_reg:com_reg, email:email, person:person}, {observe : 'response'});
    }
    
  }

  // Clients Coding
  getBranches(): Observable<any> {    
    return this.http.get<any>('branches', {observe : 'response'});
  }

  addBranch(id:number,name:string, name_ar:string, due_period:string, close_time:string,
    client_id:number, city_id:number, district_id:number, distribution_id:number,
    code:string, vat:boolean, opening:string,closing:string,address:string, phone:string): Observable<any> {
    if(id === 0 ) {
      return this.http.post<any>('branches', {name:name, name_ar:name_ar, due_period:due_period, close_time:close_time,
    client_id:client_id, city_id:city_id, district_id:district_id, distribution_id:distribution_id,
    code:code, vat:vat, opening:opening,closing:closing, address:address, phone:phone}, {observe : 'response'});
    } else {
      return this.http.put<any>('branches/' + id, {name:name, name_ar:name_ar, due_period:due_period, close_time:close_time,
    client_id:client_id, city_id:city_id, district_id:district_id, distribution_id:distribution_id,
    code:code, vat:vat, opening:opening,closing:closing, address:address, phone:phone}, {observe : 'response'});
    }
    
  }

  getForeignData(): Observable<any> {
    return this.http.get<any>('helpers/foreign', {observe : 'response'});
  }
  
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  getOrders(): Observable<any> {
  	return this.http.get<any>('orders', {observe : 'response'});
  }

  getCreateOrder(id:number): Observable<any> {
    if(id)
      return this.http.get<any>('orders/create?code='+ id, {observe : 'response'});
    else
      return this.http.get<any>('orders/create', {observe : 'response'});
  }

  createOrder(items:any,status:number,due_date:string): Observable<any> {
    return this.http.post<any>('orders', {items,status,due_date}, {observe : 'response'});
  }

  getOrderDetails(id:string): Observable<any> {
    return this.http.get<any>('orders/' + id, {observe: 'response'});
  }

  editOrderDetails(id:string): Observable<any> {
    return this.http.get<any>('orders/' + id+ '/edit', {observe: 'response'});
  }

  updateOrder(id:number,items:any,status:number,due_date:string): Observable<any> {
    return this.http.put<any>('orders/' + id,{items,status,due_date}, {observe: 'response'});
  }

  deleteOrder(id:number): Observable<any> {
    return this.http.delete<any>('orders/' + id, {observe: 'response'});
  }

  // Reviews Orders
  getOrdersProducts(): Observable<any> {
    return this.http.get('orders-products', {observe: 'response'});
  }

  updateOrderApproved(product:number,order:number, qty:number): Observable<any> {
    return this.http.post('update-approved', {product,order,qty},{observe: 'response'});
  }

  approveAll(orders:any): Observable<any> {
    return this.http.post('update-approved-all', {orders}, {observe: 'response'});
  }

  toProduction(orders:any): Observable<any> {
    return this.http.post('orders-production', {orders}, {observe: 'response'});
  }

  // Order History
  getOldOrders(): Observable<any> {
    return this.http.get('orders-history', {observe: 'response'});
  }

}

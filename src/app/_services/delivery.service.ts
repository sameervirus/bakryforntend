import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class DeliveryService {
	constructor(private http: HttpClient) {}

	getDeliveryOrders(date: any): Observable<any> {
		return this.http.get<any>('delivery-orders/' + date, {
			observe: 'response',
		});
	}

	driverApprove(orders: any): Observable<any> {
		return this.http.post<any>(
			'driver-approve',
			{ orders },
			{ observe: 'response' }
		);
	}

	getDeliverdOrder(): Observable<any> {
		return this.http.get<any>('deliverd-order', { observe: 'response' });
	}

	updateOrderDelivery(
		product: number,
		order: number,
		qty: number,
		type: string
	): Observable<any> {
		return this.http.post(
			'update-approved',
			{ product, order, qty, type },
			{ observe: 'response' }
		);
	}

	saveOrder(order: number): Observable<any> {
		return this.http.post<any>(
			'accept-delivered',
			{ order },
			{ observe: 'response' }
		);
	}
}

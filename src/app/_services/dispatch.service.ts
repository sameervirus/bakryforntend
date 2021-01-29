import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class DispatchService {
	constructor(private http: HttpClient) {}

	getDispatchOrders(date: any): Observable<any> {
		return this.http.get<any>('dispatch-orders/' + date, {
			observe: 'response',
		});
	}

	getProductionProducts(date: any): Observable<any> {
		return this.http.get<any>('productions-orders/' + date, {
			observe: 'response',
		});
	}

	approveProductions(orders: any): Observable<any> {
		return this.http.post<any>(
			'approve-productions',
			{ orders },
			{ observe: 'response' }
		);
	}

	getDispatchOrder(id: string): Observable<any> {
		return this.http.get<any>('dispatch-order/' + id, { observe: 'response' });
	}

	addBox(
		products: any,
		tempBoxType: number,
		order: any,
		id: number
	): Observable<any> {
		return this.http.post(
			'dispatch-addbox',
			{ products, tempBoxType, order, id },
			{ observe: 'response' }
		);
	}

	deleteBox(id: number): Observable<any> {
		return this.http.post('dispatch-delbox', { id }, { observe: 'response' });
	}

	approveDispatch(orders: any): Observable<any> {
		return this.http.post<any>(
			'approve-dispatch',
			{ orders },
			{ observe: 'response' }
		);
	}

	getBoxDetails(id: any): Observable<any> {
		return this.http.get<any>('box-details/' + id, { observe: 'response' });
	}
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class OrdersService {
	constructor(private http: HttpClient) {}

	getOrders(): Observable<any> {
		return this.http.get<any>('orders', { observe: 'response' });
	}

	getCreateOrder(id: number): Observable<any> {
		if (id)
			return this.http.get<any>('orders/create?code=' + id, {
				observe: 'response',
			});
		else return this.http.get<any>('orders/create', { observe: 'response' });
	}

	createOrder(items: any, status: number, due_date: string): Observable<any> {
		return this.http.post<any>(
			'orders',
			{ items, status, due_date },
			{ observe: 'response' }
		);
	}

	getOrderDetails(id: string): Observable<any> {
		return this.http.get<any>('orders/' + id, { observe: 'response' });
	}

	editOrderDetails(id: string): Observable<any> {
		return this.http.get<any>('orders/' + id + '/edit', {
			observe: 'response',
		});
	}

	updateOrder(
		id: number,
		items: any,
		status: number,
		due_date: string
	): Observable<any> {
		return this.http.put<any>(
			'orders/' + id,
			{ items, status, due_date },
			{ observe: 'response' }
		);
	}

	deleteOrder(id: number): Observable<any> {
		return this.http.delete<any>('orders/' + id, { observe: 'response' });
	}

	// Reviews Orders
	getOrdersProducts(selectedDate: any): Observable<any> {
		return this.http.get('orders-products/' + selectedDate, {
			observe: 'response',
		});
	}

	getOrdersBranches(selectedDate: any): Observable<any> {
		return this.http.get('orders-branches/' + selectedDate, {
			observe: 'response',
		});
	}

	updateOrderApproved(
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

	toProduction(orders: any): Observable<any> {
		return this.http.post(
			'orders-production',
			{ orders },
			{ observe: 'response' }
		);
	}

	toDispatch(orders: any): Observable<any> {
		return this.http.post(
			'orders-dispatch',
			{ orders },
			{ observe: 'response' }
		);
	}

	// Order History
	getOldOrders(): Observable<any> {
		return this.http.get('orders-history', { observe: 'response' });
	}

	// Active Production
	getProductionProducts(selectedDate: any): Observable<any> {
		return this.http.get('productions-orders/' + selectedDate, {
			observe: 'response',
		});
	}

	getLineProducts(production: string, selectedDate: any): Observable<any> {
		return this.http.get(`productions-lines/${production}/${selectedDate}`, {
			observe: 'response',
		});
	}

	updateProductProduction(
		id: number,
		qty: number,
		orders: any,
		production: string,
		selected_date: any
	): Observable<any> {
		return this.http.post(
			'line-update-production',
			{ id, qty, orders, production, selected_date },
			{ observe: 'response' }
		);
	}

	getAllOrders(): Observable<any> {
		return this.http.get('all-orders', { observe: 'response' });
	}

	modifyOrder(id: string): Observable<any> {
		return this.http.get('modify-orders/' + id, { observe: 'response' });
	}

	updateModifyOrder(
		id: number,
		due: string,
		products: any,
		status: number
	): Observable<any> {
		return this.http.post(
			'update-modify/' + id,
			{ due, products, status },
			{ observe: 'response' }
		);
	}
}

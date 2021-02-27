import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ReportsService {
	constructor(private http: HttpClient) {}

	getOrdersDetails(
		due: any,
		client: number,
		branch: number,
		status: number
	): Observable<any> {
		return this.http.post<any>(
			'reports-orderdetails',
			{ due, client, branch, status },
			{ observe: 'response' }
		);
	}

	getProductsDetails(
		fdue: any,
		tdue: any,
		client: number,
		branch: number,
		distribution: number
	): Observable<any> {
		return this.http.post<any>(
			'reports-products',
			{ fdue, tdue, client, branch, distribution },
			{ observe: 'response' }
		);
	}
}

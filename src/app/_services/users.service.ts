import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {    
		return this.http.get<any>('users', {observe : 'response'});
  }

  addUser(id:number, name: string, name_ar: string, email: string, username: string, 
          password: string, branch_id: number, division_id: number, mobile1: string,
          mobile2: string, landline: string, title: string, title_ar: string, 
          password_confirmation:string, client_id:number): Observable<any> {
    if(id === 0 ) {    
      return this.http.post<any>('users', {name, name_ar, email, username, password, branch_id, 
      division_id, mobile1, mobile2, landline, title, title_ar, password_confirmation, client_id},{observe : 'response'});
    } else {
      return this.http.put<any>('users/' + id, {name, name_ar, email, username, password, branch_id, 
      division_id, mobile1, mobile2, landline, title, title_ar, password_confirmation, client_id},{observe : 'response'});
    }
  }

  getPermissions(): Observable<any> {    
    return this.http.get<any>('users/permissions', {observe : 'response'});
  }

  getRoles(): Observable<any> {    
		return this.http.get<any>('roles', {observe : 'response'});
  }

  addRole(id:number, name:string,name_ar:string, permission:any): Observable<any> {
    if(id === 0 ) {
      return this.http.post<any>('roles', {name, name_ar, permission}, {observe : 'response'});
    } else {
      return this.http.put<any>('roles/' + id, {name, name_ar, permission}, {observe : 'response'});
    }
    
  }
}

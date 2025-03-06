import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { User } from '../Models/user.model';
import { Observable, catchError, map, observable, throwError } from 'rxjs';
import { Product } from '../Models/product.model';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService implements OnInit {

  constructor(private http:HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token')
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  ngOnInit(): void {

  }

  userApi = "https://localhost:44366/api/Users";

  getUserData() : Observable<any>{
    return this.http.get<User[]>(this.userApi+"/getAllUsers",{ headers: this.getHeaders() });
  }


  deleteUser(email: string) : Observable<any> {
    return this.http.delete<User[]>(this.userApi+"/deleteUser/"+email,{ headers: this.getHeaders() });
  }

  registerUser(userData: any): Observable<any> {
    return this.http.post<User>(this.userApi+"/addUser", userData)
  }


  userOnLogin(data:any) : Observable<any>{

    return this.http.post<any>(this.userApi+"/authenticate",data);
  }


}



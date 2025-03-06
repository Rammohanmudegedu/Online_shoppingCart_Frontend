import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../Models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService implements OnInit {

  constructor(private http:HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token')
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  ngOnInit(): void {

  }

  orderApi = "https://localhost:44366/api/Order";

  getOrder() : Observable<any> {
    return this.http.get<Order[]>(this.orderApi + "/GetOrders",{ headers: this.getHeaders() });
  }
  getOrderWithId(Id : number):Observable<any> {
    return this.http.get<Order[]>(this.orderApi + "/GetOrderById/" +Id,{ headers: this.getHeaders() })
  }
  getOrderWithEmail(email : string):Observable<any> {
    return this.http.get<Order[]>(this.orderApi + "/GetOrdersByEmail/" +email,{ headers: this.getHeaders() })
  }
  addOrder(data:any) : Observable<Order[]>{
    return this.http.post<Order[]>(this.orderApi + "/PlaceOrder",data,{ headers: this.getHeaders() });
  }
  cancelOrder(Id : number) :Observable<any> {
    return this.http.delete<Order[]>(this.orderApi +"/cancelOrderById/" +Id,{ headers: this.getHeaders() })
  }
}

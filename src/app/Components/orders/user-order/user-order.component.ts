import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/Models/order.model';
import { OrderServiceService } from 'src/app/Services/order-service.service';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.css']
})
export class UserOrderComponent implements OnInit {

  public orders:Order[]=[];
  constructor(private orderService:OrderServiceService) { }

  ngOnInit(): void {
    this.getOrders();
  }


  public email:any = sessionStorage.getItem('email');

  getOrders(){
    this.orderService.getOrderWithEmail(this.email).subscribe((data) =>{
      this.orders=data;
    })
   }

   cancelOrder(Id:number){
    this.orderService.cancelOrder(Id).subscribe((data) =>{

    })
    alert('Order is Cancelled successfully');
    this.getOrders();

   }

}

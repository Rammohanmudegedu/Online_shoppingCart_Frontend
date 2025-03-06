import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Order } from 'src/app/Models/order.model';
import { OrderServiceService } from 'src/app/Services/order-service.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  public orders:Order[]=[];
  constructor(private orderService:OrderServiceService) {
  }

  ngOnInit(): void {
    this.getOrders();

  }

  getOrders(){
    this.orderService.getOrder().subscribe((data) =>{
      this.orders=data;
    })
   }






}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/Models/order.model';
import { orderItem } from 'src/app/Models/orderItem.model';
import { OrderServiceService } from 'src/app/Services/order-service.service';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.css']
})
export class OrderItemsComponent implements OnInit {

  public orderId:any;
  public orders:any;

  public userRole : any = sessionStorage.getItem('role')
  constructor(private route: ActivatedRoute, private orderService:OrderServiceService) { }

  ngOnInit(): void {
    this.getOrderItemsWithId();
  }

  getOrderItemsWithId(){
    this.route.params.subscribe(params => {
      this.orderId = params['id'];
      this.orderService.getOrderWithId(this.orderId).subscribe((data: Order[]) => {
        this.orders = data;
        console.log(data);
      });
    });
  }
}

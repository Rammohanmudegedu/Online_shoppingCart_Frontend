import { orderItem } from "./orderItem.model";

export interface Order{
    orderId: number;
    address: string;
    zipCode: string;
    city: string;
    orderItems: orderItem[];
    orderPrice: number;
    orderedDate: Date;
    orderStatus:string;
  }

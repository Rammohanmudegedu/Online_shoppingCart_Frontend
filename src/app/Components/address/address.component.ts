import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, NavigationExtras, Router } from '@angular/router';
import { filter } from 'rxjs';
import { orderItem } from 'src/app/Models/orderItem.model';
import { Product } from 'src/app/Models/product.model';
import { CartServiceService } from 'src/app/Services/cart-service.service';
import { OrderServiceService } from 'src/app/Services/order-service.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {



  cartItems: { email: string, product: Product, quantity: number }[] = [];

  orderItems: { email:string, productId: number, product_Name: string, product_Image:any ,quantity: number, unitPrice: number, orderId :number }[] = [];



  constructor(private orderService : OrderServiceService,
    private cartService: CartServiceService, private router : Router) { }


  orderForm = new FormGroup({
    address: new FormControl('', [Validators.required]),
    zipcode: new FormControl('', [Validators.required, Validators.pattern(/^\d{6}$/)]),
    city: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]),
    orderItems: new FormControl(),
    orderPrice: new FormControl(0),
    orderedDate: new FormControl(new Date()),
    orderStatus: new FormControl(''),
  });

  ngOnInit(): void {

    this.loadCartItems();
    this.orderForm.controls['orderItems'].setValue(this.orderItems);


  }



  placeOrder(): void {

    if(this.orderForm.touched && this.orderForm.valid){
      this.orderService.addOrder(this.orderForm.value).subscribe((res) => {

      });
      alert('Order placed successfully');
        this.updateCartItems();
        this.router.navigateByUrl('/payment');
    }
    else{
      this.orderForm.markAllAsTouched();
    }

  }



  loadCartItems() {
    const sessionStorageEmail = sessionStorage.getItem('email');
    if (sessionStorageEmail) {
      this.cartService.getCartItems().subscribe(cartItems => {

        this.cartItems = cartItems.filter(item => item.email === sessionStorageEmail);
        this.orderItems = this.cartItems.map(item => ({
          email: item.email,
          productId: item.product.productId,
          product_Name: item.product.product_Name,
          product_Image: item.product.product_Image,
          quantity: item.quantity,
          unitPrice: item.product.unitPrice,
          orderId : 0
        }));

      });
    }
  }

  updateCartItems() {
    const sessionStorageEmail = sessionStorage.getItem('email');
    if (sessionStorageEmail) {
      let cartItems = [];
        const cartItemsString = localStorage.getItem('cartItems');
        if (cartItemsString) {
          cartItems = JSON.parse(cartItemsString);
        }

      const updatedCartItems = cartItems.filter((item: any) => item.email !== sessionStorageEmail);
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

    }
  }





}

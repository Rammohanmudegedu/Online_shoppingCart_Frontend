import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Models/product.model';
import { CartServiceService } from 'src/app/Services/cart-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: { email: string, product: Product, quantity: number }[] = [];

  constructor(private cartService: CartServiceService) { }

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems() {
    const sessionStorageEmail = sessionStorage.getItem('email');
    if (sessionStorageEmail) {
      this.cartService.getCartItems().subscribe(cartItems => {
        this.cartItems = cartItems.filter(item => item.email === sessionStorageEmail);
      });
    } else {

      this.cartItems = [];
    }
  }

  decrementQuantity(product: Product) {
    this.cartService.deleteItemFromCart(product);
    window.location.reload();
  }

  incrementQuantity(product : Product){
    this.cartService.addToCart(product);

  }

  removeProductfromCart(product : Product){
    this.cartService.deleteProductfromCart(product);
    window.location.reload();
  }

  getTotalCartPrice(): number {
    return this.cartItems.reduce((total, item) => total + (item.product.unitPrice * item.quantity), 0);
  }



}

import { Injectable } from '@angular/core';
import { Product } from '../Models/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  private cartItems: { email: string, product: Product , quantity:number }[] = [];
  private cartSubject = new BehaviorSubject<{ email: string, product: Product, quantity:number }[]>([]);

  constructor() {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      this.cartItems = JSON.parse(storedCartItems);
      this.cartSubject.next(this.cartItems);
    }

  }

  getCartItems() {
    return this.cartSubject.asObservable();
  }



  addToCart(product: Product) {
    const email = sessionStorage.getItem('email');
    if (email) {

      const existingItemIndex = this.cartItems.findIndex(item => item.email === email && item.product.productId === product.productId);

      if (existingItemIndex !== -1) {

        this.cartItems[existingItemIndex].quantity++;
      } else {

        this.cartItems.push({ email: email, product: product, quantity: 1 });
      }

      this.cartSubject.next(this.cartItems);

      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    }
  }

  deleteItemFromCart(product: Product) {
    const email = sessionStorage.getItem('email');
    if (email) {
        const existingItemIndex = this.cartItems.findIndex(item => item.email === email && item.product.productId === product.productId);

        if (existingItemIndex !== -1) {
            if (this.cartItems[existingItemIndex].quantity > 1) {
                this.cartItems[existingItemIndex].quantity--;
            } else {

                this.cartItems.splice(existingItemIndex, 1);
            }

            this.cartSubject.next(this.cartItems);

            localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
        }
    }
}

deleteProductfromCart(product: Product) {
  const email = sessionStorage.getItem('email');
  if (email) {
      const existingItemIndex = this.cartItems.findIndex(item => item.email === email && item.product.productId === product.productId);

      if (existingItemIndex !== -1) {

          this.cartItems.splice(existingItemIndex, 1);


          this.cartSubject.next(this.cartItems);

          localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
      }
  }
}


}

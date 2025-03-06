import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartServiceService } from 'src/app/Services/cart-service.service';

@Component({
  selector: 'app-user-nav-bar',
  templateUrl: './user-nav-bar.component.html',
  styleUrls: ['./user-nav-bar.component.css']
})
export class UserNavBarComponent implements OnInit {

  public userEmail = sessionStorage.getItem('email') as string;
  cartItemCount: number = 0;

  constructor(private router:Router) {}

  ngOnInit(): void {
    this.updateCartItemCount();

  }

  Logout(){
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('role');

  }


  updateCartItemCount(): void {
    try {
      const cartItemsString = localStorage.getItem('cartItems');
      if (cartItemsString !== null) {
        const cartItems = JSON.parse(cartItemsString);

        const userCartItems = cartItems.filter((item: any) => item.email === this.userEmail);

        const count = userCartItems.length;

        this.cartItemCount = count;

        localStorage.setItem('cartItemCount', count.toString());

        console.log(count);




      } else {

        this.cartItemCount = 0;

      }
    } catch (error) {
      console.error(error);
      this.cartItemCount = 0;

    }

  }


  onSelectionChange(event: any) {
    const value = event.target.value;
     if (value === 'my-orders') {
      this.router.navigate(['/userOrders']);
    }
  }



}

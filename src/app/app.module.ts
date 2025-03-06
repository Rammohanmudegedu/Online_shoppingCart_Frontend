import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { ProductsComponent } from './Components/products/products.component';
import { HomeNavBarComponent } from './Nav_bar/home-nav-bar/home-nav-bar.component';
import { UserNavBarComponent } from './Nav_bar/user-nav-bar/user-nav-bar.component';
import { HomeFooterComponent } from './footer/home-footer/home-footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { UsersComponent } from './Components/users/users.component';
import { AdminNavComponent } from './Nav_bar/admin-nav/admin-nav.component';
import { CartComponent } from './Components/cart/cart.component';
import { OrdersComponent } from './Components/orders/orders.component';
import { AdminProductsComponent } from './Components/admin-products/admin-products.component';
import { AddAdminComponent } from './Components/add-admin/add-admin.component';
import { ProductDetailsComponent } from './Components/products/product-details/product-details.component';
import { OrderItemsComponent } from './Components/orders/order-items/order-items.component';
import { AddressComponent } from './Components/address/address.component';
import { LoginNavComponent } from './Nav_bar/login-nav/login-nav.component';
import { AdproductDetailsComponent } from './Components/admin-products/adproduct-details/adproduct-details.component';
import { UserOrderComponent } from './Components/orders/user-order/user-order.component';
import { PaymentPageComponent } from './Components/payment-page/payment-page.component';
import { AddProductComponent } from './Components/admin-products/add-product/add-product.component';
import { UpdateProductComponent } from './Components/admin-products/update-product/update-product.component';
import { SupplierNavComponent } from './Nav_bar/supplier-nav/supplier-nav.component';






@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ProductsComponent,
    HomeNavBarComponent,
    UserNavBarComponent,
    HomeFooterComponent,
    SignUpComponent,
    UsersComponent,
    AdminNavComponent,
    CartComponent,
    OrdersComponent,
    AdminProductsComponent,
    AddAdminComponent,
    ProductDetailsComponent,
    OrderItemsComponent,
    AddressComponent,
    LoginNavComponent,
    AdproductDetailsComponent,
    UserOrderComponent,
    PaymentPageComponent,
    AddProductComponent,
    UpdateProductComponent,
    SupplierNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

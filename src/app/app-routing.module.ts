import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { ProductsComponent } from './Components/products/products.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { UsersComponent } from './Components/users/users.component';
import { CartComponent } from './Components/cart/cart.component';
import { AdminProductsComponent } from './Components/admin-products/admin-products.component';
import { OrdersComponent } from './Components/orders/orders.component';
import { AddAdminComponent } from './Components/add-admin/add-admin.component';
import { ProductDetailsComponent } from './Components/products/product-details/product-details.component';
import { OrderItemsComponent } from './Components/orders/order-items/order-items.component';
import { AddressComponent } from './Components/address/address.component';
import { AdproductDetailsComponent } from './Components/admin-products/adproduct-details/adproduct-details.component';
import { UserOrderComponent } from './Components/orders/user-order/user-order.component';
import { PaymentPageComponent } from './Components/payment-page/payment-page.component';
import { AddProductComponent } from './Components/admin-products/add-product/add-product.component';
import { UpdateProductComponent } from './Components/admin-products/update-product/update-product.component';



const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"login", component:LoginComponent},
  {path:"products", component:ProductsComponent},
  {path:"signup", component:SignUpComponent},
  {path:"users", component:UsersComponent},
  {path:"cart", component:CartComponent},
  {path:"adminProducts", component:AdminProductsComponent},
  {path:"orders", component:OrdersComponent},
  {path:"addAdmin", component:AddAdminComponent},
  {path:"productDetails/:id", component:ProductDetailsComponent},
  {path:"adproductDetails/:id", component:AdproductDetailsComponent},
  {path:"orderItems/:id", component:OrderItemsComponent},
  {path:"address", component:AddressComponent},
  {path:"userOrders", component:UserOrderComponent},
  {path:"payment", component:PaymentPageComponent},
  {path:"addNewProduct", component:AddProductComponent},
  {path:"updateProduct/:id", component:UpdateProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

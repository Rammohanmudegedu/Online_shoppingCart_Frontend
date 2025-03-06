import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/Models/product.model';
import { ProductServiceService } from 'src/app/Services/product-service.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  public products:Product[]=[];
  public userRole : any = sessionStorage.getItem('role')
  constructor(private productService:ProductServiceService) { }


  newProductFrom = new FormGroup({
    productName: new FormControl(''),
    description: new FormControl(''),
    unitPrice:new FormControl(''),
    productImge: new FormControl(''),
    categoty: new FormControl(''),
    brandNmae: new FormControl(''),
    quantity: new FormControl(''),
  });




  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.productService.getProductsData().subscribe((data:Product[]) =>{
      this.products = data;
    },
    (error) => {
      console.error('Error fetching products:', error);
    }
    );
  }


}

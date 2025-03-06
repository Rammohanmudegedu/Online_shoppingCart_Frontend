import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Product } from 'src/app/Models/product.model';
import { UserNavBarComponent } from 'src/app/Nav_bar/user-nav-bar/user-nav-bar.component';
import { CartServiceService } from 'src/app/Services/cart-service.service';
import { ProductServiceService } from 'src/app/Services/product-service.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public products:Product[]=[];
  public originalProducts: Product[] =[];
  searchForm: FormGroup;
  public userEmail : any = sessionStorage.getItem('email');

  constructor(private productService:ProductServiceService,
                private router:Router,
                private cartService:CartServiceService
              , private formBuilder: FormBuilder) {
                this.searchForm = this.formBuilder.group({
                  searchTerm: ['']
                });
              }

  ngOnInit(): void {
    this.getProducts();


  }

  getProducts(){
    this.productService.getProductsData().subscribe((data:Product[]) =>{

      this.originalProducts = data;
      this.products = this.originalProducts.slice();

    },
    (error) => {
      console.error('Error fetching products:', error);
    }
    );
  }



  addToCart(product: Product) {
    if(this.userEmail != null){
    this.cartService.addToCart(product);
    alert('prodcut is added to cart');
    window.location.reload();
    }
    else{
      this.router.navigateByUrl('/login');
      alert('please login')
    }

}

searchProducts() {
  const searchTermControl = this.searchForm.get('searchTerm');
  if (searchTermControl) {
    const searchTerm = searchTermControl.value.trim().toLowerCase();
    if (searchTerm !== '') {
      this.products = this.products.filter(product =>
        product.product_Name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.brand_Name.toLowerCase().includes(searchTerm)
      );
    } else {
      this.getProducts();
    }
  }
}



filterByCategory(category: string) {
  if (this.originalProducts) {
    if (category === 'All') {
      this.products = this.originalProducts;
    } else {
      this.products = this.originalProducts.filter(product =>
        product.category.toLowerCase() === category.toLowerCase()
      );
    }
  }
}





}

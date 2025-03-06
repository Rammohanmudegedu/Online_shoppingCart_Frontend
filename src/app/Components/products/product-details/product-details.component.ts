import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/Models/product.model';
import { CartServiceService } from 'src/app/Services/cart-service.service';
import { ProductServiceService } from 'src/app/Services/product-service.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  public productId:any;
  public product:any;
  public userEmail : any = sessionStorage.getItem('email');

  constructor(private route: ActivatedRoute, private productService:ProductServiceService,
              private cartService : CartServiceService,
              private router:Router) { }

  ngOnInit(): void {
    this.getProdutWithId();
  }

  getProdutWithId(){
    this.route.params.subscribe(params => {
      this.productId = params['id'];
      this.productService.getProdutwithId(this.productId).subscribe((data: Product[]) => {
        this.product = data;
      });
    });
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
}

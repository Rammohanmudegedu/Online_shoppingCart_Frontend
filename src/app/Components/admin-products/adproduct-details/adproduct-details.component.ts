import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/Models/product.model';
import { ProductServiceService } from 'src/app/Services/product-service.service';

@Component({
  selector: 'app-adproduct-details',
  templateUrl: './adproduct-details.component.html',
  styleUrls: ['./adproduct-details.component.css']
})
export class AdproductDetailsComponent implements OnInit {

  public productId:any;
  public product:any;

  public userRole : any = sessionStorage.getItem('role')
  constructor(private route: ActivatedRoute, private productService:ProductServiceService,
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

  deleteProduct(id: number){
    this.productService.removeProduct(id).subscribe((res) =>{

    })
    alert('Product is deleted successfully');
      this.router.navigateByUrl('/adminProducts');



   }

}

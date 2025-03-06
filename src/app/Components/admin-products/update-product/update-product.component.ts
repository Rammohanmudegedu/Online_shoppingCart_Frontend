import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductServiceService } from 'src/app/Services/product-service.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  public productId: any
  public productImage: any

  public userRole : any = sessionStorage.getItem('role')

  editProductForm = new FormGroup({
    product_Name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9\\s]+$')]),
    description: new FormControl('', [Validators.required]),
    unitPrice:new FormControl('', [Validators.required, Validators.min(1)]),
    product_Image: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z\\s]+$')]),
    brand_Name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z\\s]+$')]),
    quantityInStock: new FormControl('', [Validators.required, Validators.min(0)])
  });

  constructor(private productService: ProductServiceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getproductId();
  }

  getproductId(){
    this.productId = this.route.snapshot.paramMap.get('id');

    this.productService.getProdutwithId(this.productId).subscribe(
      product => {

        this.editProductForm.patchValue({
          product_Name: product.product_Name,
          description: product.description,
          unitPrice: product.unitPrice,
          category: product.category,
          brand_Name: product.brand_Name,
          quantityInStock: product.quantityInStock,
          product_Image :product.product_Image
        });
      },
      error => {
        console.error('Error fetching product data:', error);
      }
    );
  }


  updateProduct() {

    if(this.editProductForm.touched && this.editProductForm.valid){
      this.productService.postProduct(this.productId,this.editProductForm.value, this.productImage).subscribe((res) => {

      });
      alert('Product Updated successfully');
      this.editProductForm.reset();
    }
    else{
      this.editProductForm.markAllAsTouched();
    }
  }

  onImageSelected(event: any) {
    const allowedExtensions = /\.(jpg|jpeg|png)$/i;
    const files = event.target.files;

    if (files.length === 0) {
        return;
    }

    const fileName = files[0].name;
    if (!allowedExtensions.test(fileName)) {
        alert("Please select a valid image file (JPG, JPEG, PNG).");
        event.target.value = '';
        return;
    }

    this.productImage = files[0];

  }

}

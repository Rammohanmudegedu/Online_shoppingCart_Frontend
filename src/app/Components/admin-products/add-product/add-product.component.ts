import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductServiceService } from 'src/app/Services/product-service.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  private productImage: any;

  public userRole : any = sessionStorage.getItem('role')

  constructor(private productService:ProductServiceService) { }

  newProductFrom = new FormGroup({
    product_Name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9\\s]+$')]),
    description: new FormControl('', [Validators.required]),
    unitPrice:new FormControl('', [Validators.required, Validators.min(1)]),
    product_Image: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z\\s]+$')]),
    brand_Name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z\\s]+$')]),
    quantityInStock: new FormControl('', [Validators.required, Validators.min(0)])
  });


  ngOnInit(): void {
  }

  submitProduct() {
    if(this.newProductFrom.touched && this.newProductFrom.valid){
      this.productService.addProduct(this.newProductFrom.value, this.productImage).subscribe((res) => {
        alert('Product Added successfully');
          this.newProductFrom.reset();

      },(error) =>{
        if(error.status === 409){
          alert("product already Exists");
        }
        else{
          alert('Product Added successfully');
          this.newProductFrom.reset();
        }
      });

    }
    else{
      this.newProductFrom.markAllAsTouched();
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

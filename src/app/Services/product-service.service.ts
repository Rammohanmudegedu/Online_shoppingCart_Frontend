import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../Models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService implements OnInit {


  constructor(private http:HttpClient) { }


  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token')
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  ngOnInit(): void {
    this.getProductsData();


  }

  productApi = "https://localhost:44366/api/Products";

  getProductsData() : Observable<any> {
    return this.http.get<any>(this.productApi + "/GetProducts",{ headers: this.getHeaders() });
  }
  getProdutwithId(Id : number):Observable<any> {
    return this.http.get<Product[]>(this.productApi + "/Getproduct/" +Id,{ headers: this.getHeaders() });
  }


  addProduct(data: any, photo: any): Observable<any> {
    const formData = new FormData();
    formData.append('product_Name', data.product_Name);
    formData.append('description', data.description);
    formData.append('unitPrice', data.unitPrice);
    formData.append('category', data.category);
    formData.append('brand_Name', data.brand_Name);
    formData.append('quantityInStock', data.quantityInStock);
    formData.append('productImage', photo);

    return this.http.post<any>(this.productApi+"/AddProduct", formData, {
      headers: this.getHeaders()
    });
  }



  postProduct(productId: number, newProductData: any, productImage: File): Observable<any> {
    const formData = new FormData();
    formData.append('product_Name', newProductData.product_Name);
    formData.append('description', newProductData.description);
    formData.append('unitPrice', newProductData.unitPrice);
    formData.append('category', newProductData.category);
    formData.append('brand_Name', newProductData.brand_Name);
    formData.append('quantityInStock', newProductData.quantityInStock);
    formData.append('productImage', productImage);

    return this.http.put<any>(this.productApi+"/UpdateProduct/"+productId , formData, {
      headers: this.getHeaders()
    })
  }


  removeProduct(Id : number) : Observable<any>{
    return this.http.delete<Product[]>(this.productApi+"/deleteProduct/"+Id,{ headers: this.getHeaders() })
  }

}

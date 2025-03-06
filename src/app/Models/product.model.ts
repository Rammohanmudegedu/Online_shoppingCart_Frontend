import { DecimalPipe } from "@angular/common";

export interface Product{
  productId: number;
  product_Name: string;
  description: string;
  unitPrice: number;
  product_Image: any;
  category: string;
  brand_Name: string;
  quantityInStock: number;
}

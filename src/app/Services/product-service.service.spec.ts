import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductServiceService } from './product-service.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Product } from '../Models/product.model';

describe('ProductServiceService', () => {
  let service: ProductServiceService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductServiceService]
    });
    service = TestBed.inject(ProductServiceService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get products data', () => {
    const mockProducts: Product[] = [
      { productId: 1, product_Name: 'Product 1', description: 'Description 1', unitPrice: 10, category: 'Category 1', brand_Name: 'Brand 1', quantityInStock: 10, product_Image:null }
    ];

    service.getProductsData().subscribe((products: Product[]) => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpTestingController.expectOne('https://localhost:44366/api/Products/GetProducts');
    expect(req.request.method).toEqual('GET');

    req.flush(mockProducts);
  });

  it('should get product with ID', () => {
    const productId = 1;
    const mockProduct: Product = { productId: 1, product_Name: 'Product 1', description: 'Description 1', unitPrice: 10, category: 'Category 1', brand_Name: 'Brand 1', quantityInStock: 10, product_Image:null };

    service.getProdutwithId(productId).subscribe((product: Product) => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpTestingController.expectOne(`https://localhost:44366/api/Products/Getproduct/${productId}`);
    expect(req.request.method).toEqual('GET');

    req.flush(mockProduct);
  });

  it('should add product', () => {
    const mockProductData: any = { product_Name: 'Product 1', description: 'Description 1', unitPrice: 10, category: 'Category 1', brand_Name: 'Brand 1', quantityInStock: 10, product_Image:null  };
    const mockPhoto: any = {};
    const mockResponse: any = { success: true };

    service.addProduct(mockProductData, mockPhoto).subscribe((response: any) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne('https://localhost:44366/api/Products/AddProduct');
    expect(req.request.method).toEqual('POST');

    req.flush(mockResponse);
  });

  it('should post product', () => {
    const productId = 1;
    const mockProductData: any = { product_Name: 'Product 1', description: 'Description 1', unitPrice: 10, category: 'Category 1', brand_Name: 'Brand 1', quantityInStock: 10 };
    const mockProductImage: File = new File([], 'mockImage.png');
    const mockResponse: any = { success: true };

    service.postProduct(productId, mockProductData, mockProductImage).subscribe((response: any) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`https://localhost:44366/api/Products/UpdateProduct/${productId}`);
    expect(req.request.method).toEqual('PUT');

    req.flush(mockResponse);
  });

  it('should remove product', () => {
    const productId = 1;
    const mockResponse: any = { success: true };

    service.removeProduct(productId).subscribe((response: any) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`https://localhost:44366/api/Products/deleteProduct/${productId}`);
    expect(req.request.method).toEqual('DELETE');

    req.flush(mockResponse);
  });

});


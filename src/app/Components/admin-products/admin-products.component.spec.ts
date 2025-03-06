import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminProductsComponent } from './admin-products.component';
import { ProductServiceService } from 'src/app/Services/product-service.service';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { Product } from 'src/app/Models/product.model';

describe('AdminProductsComponent', () => {
  let component: AdminProductsComponent;
  let fixture: ComponentFixture<AdminProductsComponent>;
  let productService: jasmine.SpyObj<ProductServiceService>;

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductServiceService', ['getProductsData']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [AdminProductsComponent],
      providers: [
        { provide: ProductServiceService, useValue: productServiceSpy }
      ]
    })
      .compileComponents();

    productService = TestBed.inject(ProductServiceService) as jasmine.SpyObj<ProductServiceService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch products on initialization', () => {
    const products: Product[] = [
      { productId: 1, product_Name: 'Product 1', description: 'Description 1', unitPrice: 10, product_Image: null, category: 'Category 1', brand_Name: 'Brand 1', quantityInStock: 10 }
    ];
    productService.getProductsData.and.returnValue(of(products));

    component.ngOnInit();

    expect(component.products).toEqual(products);
  });
});

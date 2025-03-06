import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsComponent } from './products.component';
import { CartServiceService } from 'src/app/Services/cart-service.service';
import { ProductServiceService } from 'src/app/Services/product-service.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Product } from 'src/app/Models/product.model';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productService: jasmine.SpyObj<ProductServiceService>;
  let cartService: jasmine.SpyObj<CartServiceService>;

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductServiceService', ['getProductsData']);
    const cartServiceSpy = jasmine.createSpyObj('CartServiceService', ['addToCart']);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ProductsComponent],
      providers: [
        FormBuilder,
        { provide: ProductServiceService, useValue: productServiceSpy },
        { provide: CartServiceService, useValue: cartServiceSpy }
      ]
    })
      .compileComponents();

    productService = TestBed.inject(ProductServiceService) as jasmine.SpyObj<ProductServiceService>;
    cartService = TestBed.inject(CartServiceService) as jasmine.SpyObj<CartServiceService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch products on initialization', () => {
    const products: Product[] = [
      { productId: 1, product_Name: 'Product 1', description: 'Description 1', unitPrice: 10, product_Image: null, category: 'Category 1', brand_Name: 'Brand 1', quantityInStock: 10 },
      { productId: 2, product_Name: 'Product 2', description: 'Description 2', unitPrice: 20, product_Image: null, category: 'Category 2', brand_Name: 'Brand 2', quantityInStock: 20 }
    ];
    productService.getProductsData.and.returnValue(of(products));

    component.ngOnInit();

    expect(component.products).toEqual(products);
  });

  it('should add product to cart when addToCart is called', () => {
    const product: Product = { productId: 1, product_Name: 'Product 1', description: 'Description 1', unitPrice: 10, product_Image: null, category: 'Category 1', brand_Name: 'Brand 1', quantityInStock: 10 };
    component.userEmail = 'test@example.com';

    component.addToCart(product);

    expect(cartService.addToCart).toHaveBeenCalledWith(product);
  });
});

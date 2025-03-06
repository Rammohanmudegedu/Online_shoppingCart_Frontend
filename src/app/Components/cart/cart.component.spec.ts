import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { CartServiceService } from 'src/app/Services/cart-service.service';
import { of } from 'rxjs';
import { Product } from 'src/app/Models/product.model';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartService: jasmine.SpyObj<CartServiceService>;

  beforeEach(async () => {
    const cartServiceSpy = jasmine.createSpyObj('CartServiceService', ['getCartItems']);

    await TestBed.configureTestingModule({
      declarations: [CartComponent],
      providers: [
        { provide: CartServiceService, useValue: cartServiceSpy }
      ]
    }).compileComponents();

    cartService = TestBed.inject(CartServiceService) as jasmine.SpyObj<CartServiceService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load cart items from service on initialization', () => {
    const sessionStorageEmail = 'test@example.com';
    sessionStorage.setItem('email', sessionStorageEmail);

    const cartItems = [
      { email: sessionStorageEmail, product: { productId: 1, product_Name: 'Product 1', description: 'Description 1', unitPrice: 10, product_Image: null, category: 'Category 1', brand_Name: 'Brand 1', quantityInStock: 10 }, quantity: 2 },
      { email: sessionStorageEmail, product: { productId: 2, product_Name: 'Product 2', description: 'Description 2', unitPrice: 20, product_Image: null, category: 'Category 2', brand_Name: 'Brand 2', quantityInStock: 20 }, quantity: 3 }
    ];
    cartService.getCartItems.and.returnValue(of(cartItems));

    component.ngOnInit();

    expect(component.cartItems).toEqual(cartItems.filter(item => item.email === sessionStorageEmail));
  });

  it('should set cart items to empty array if email is not available in session storage', () => {
    sessionStorage.removeItem('email');

    component.ngOnInit();

    expect(component.cartItems).toEqual([]);
  });
});

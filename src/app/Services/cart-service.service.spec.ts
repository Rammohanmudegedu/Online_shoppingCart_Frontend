import { TestBed } from '@angular/core/testing';
import { CartServiceService } from './cart-service.service';
import { Product } from '../Models/product.model';

describe('CartServiceService', () => {
  let service: CartServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add product to cart', () => {
    const product: Product = { productId: 1, product_Name: 'Product 1', description: 'Description', unitPrice: 100, category: 'Category', brand_Name: 'Brand', quantityInStock: 10, product_Image: null };
    service.addToCart(product);

    service.getCartItems().subscribe(cartItems => {
      expect(cartItems.length).toBe(1);
      expect(cartItems[0].product).toEqual(product);
      expect(cartItems[0].quantity).toBe(1);
    });
  });


  it('should delete product from cart', () => {
    const product: Product = { productId: 1, product_Name: 'Product 1', description: 'Description', unitPrice: 100, category: 'Category', brand_Name: 'Brand', quantityInStock: 10, product_Image: null };
    service.addToCart(product);

    service.deleteProductfromCart(product);

    service.getCartItems().subscribe(cartItems => {
      expect(cartItems.length).toBe(0);
    });
  });
});


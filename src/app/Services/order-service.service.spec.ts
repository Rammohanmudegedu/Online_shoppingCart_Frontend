import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OrderServiceService } from './order-service.service';
import { Order } from '../Models/order.model';

describe('OrderServiceService', () => {
  let service: OrderServiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrderServiceService]
    });
    service = TestBed.inject(OrderServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch orders', () => {
    const dummyOrders: Order[] = [
      { orderId: 1, address: '123 Street', zipCode: '12345', city: 'City', orderItems: [], orderPrice: 100, orderedDate: new Date(), orderStatus: 'active' }
    ];

    service.getOrder().subscribe((orders: Order[]) => {
      expect(orders.length).toBe(1);
      expect(orders).toEqual(dummyOrders);
    });

    const req = httpMock.expectOne('https://localhost:44366/api/Order/GetOrders');
    expect(req.request.method).toBe('GET');
    req.flush(dummyOrders);
  });

  it('should fetch order with given id', () => {
    const orderId = 1;
    const dummyOrder: Order = { orderId, address: '123 Street', zipCode: '12345', city: 'City', orderItems: [], orderPrice: 100, orderedDate: new Date(), orderStatus: 'active' };

    service.getOrderWithId(orderId).subscribe((order: Order) => {
      expect(order).toEqual(dummyOrder);
    });

    const req = httpMock.expectOne(`https://localhost:44366/api/Order/GetOrderById/${orderId}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyOrder);
  });

  it('should fetch orders with given email', () => {
    const email = 'test@example.com';
    const dummyOrders: Order[] = [
      { orderId: 1, address: '123 Street', zipCode: '12345', city: 'City', orderItems: [], orderPrice: 100, orderedDate: new Date(), orderStatus: 'active' }
    ];

    service.getOrderWithEmail(email).subscribe((orders: Order[]) => {
      expect(orders.length).toBe(1);
      expect(orders).toEqual(dummyOrders);
    });

    const req = httpMock.expectOne(`https://localhost:44366/api/Order/GetOrdersByEmail/${email}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyOrders);
  });

  it('should add an order', () => {
    const dummyOrder: Order = { orderId: 1, address: '123 Street', zipCode: '12345', city: 'City', orderItems: [], orderPrice: 100, orderedDate: new Date(), orderStatus: 'active' };
    const dummyData = { orderId: 1, address: '123 Street', zipCode: '12345', city: 'City', orderItems: [], orderPrice: 100, orderedDate: new Date(), orderStatus: 'active' };

    service.addOrder(dummyData).subscribe((order: any) => {
      expect(order).toEqual(dummyOrder);
    });

    const req = httpMock.expectOne('https://localhost:44366/api/Order/PlaceOrder');
    expect(req.request.method).toBe('POST');
    req.flush(dummyOrder);
  });

  it('should cancel an order with given id', () => {
    const orderId = 1;
    const dummyResponse = { message: 'Order cancelled successfully' };

    service.cancelOrder(orderId).subscribe((response: any) => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`https://localhost:44366/api/Order/cancelOrderById/${orderId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(dummyResponse);
  });
});


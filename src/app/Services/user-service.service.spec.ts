import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserServiceService } from './user-service.service';
import { HttpHeaders } from '@angular/common/http';
import { User } from '../Models/user.model';

describe('UserServiceService', () => {
  let service: UserServiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserServiceService]
    });
    service = TestBed.inject(UserServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get user data', () => {
    const mockUserData: User[] = [{ email:'user@gmail.com', userName:'rammohan', phone:'7799252458', password:'Password@123', roles:[]}];

    service.getUserData().subscribe(data => {
      expect(data).toEqual(mockUserData);
    });

    const req = httpMock.expectOne('https://localhost:44366/api/Users/getAllUsers');
    expect(req.request.method).toBe('GET');
    req.flush(mockUserData);
  });

  it('should delete user', () => {
    const email = 'test@example.com';

    service.deleteUser(email).subscribe(() => {
      expect().nothing();
    });

    const req = httpMock.expectOne(`https://localhost:44366/api/Users/deleteUser/${email}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should register user', () => {
    const userData = { email: 'test@example.com', userName:'username', phone:'7799252458', password: 'password', roles: ['User'] };

    service.registerUser(userData).subscribe(() => {
      expect().nothing();
    });

    const req = httpMock.expectOne('https://localhost:44366/api/Users/addUser');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(userData);
    req.flush({});
  });

  it('should login user', () => {
    const loginData = { email: 'test@example.com', password: 'password' };

    service.userOnLogin(loginData).subscribe(() => {
      expect().nothing();
    });

    const req = httpMock.expectOne('https://localhost:44366/api/Users/authenticate');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(loginData);
    req.flush({});
  });
});

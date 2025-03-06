import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersComponent } from './users.component';
import { UserServiceService } from 'src/app/Services/user-service.service';
import { of } from 'rxjs';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let userService: jasmine.SpyObj<UserServiceService>;

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserServiceService', ['getUserData', 'deleteUser']);
    await TestBed.configureTestingModule({
      declarations: [UsersComponent],
      providers: [{ provide: UserServiceService, useValue: userServiceSpy }]
    }).compileComponents();
    userService = TestBed.inject(UserServiceService) as jasmine.SpyObj<UserServiceService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch users on initialization', () => {
    const users = [{ email: 'user1@example.com' }, { email: 'user2@example.com' }];
    userService.getUserData.and.returnValue(of(users));

    component.ngOnInit();

    expect(component.users).toEqual(users);
  });
});

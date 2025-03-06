import { devOnlyGuardedExpression } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductServiceService } from 'src/app/Services/product-service.service';
import { UserServiceService } from 'src/app/Services/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public errorMessage : string = '';
  constructor(private userSerice : UserServiceService, private router:Router,
              private productService:ProductServiceService) { }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&]{6,}$')])
  });




  Login(){
    this.loginForm.markAllAsTouched();

    if (this.loginForm.valid) {

      const userEmail = this.loginForm.controls['email'].value;

      if (userEmail !== null) {

        this.userSerice.userOnLogin(this.loginForm.value).subscribe((res: any) => {
          const Role = res.roles;

          if(Role == 'User'){
          sessionStorage.setItem('token', res.token);
          sessionStorage.setItem('email', userEmail);
          sessionStorage.setItem('role', res.roles);
          this.router.navigateByUrl('/products');
          }
          else if(Role == 'Admin'){
            sessionStorage.setItem('token', res.token);
            sessionStorage.setItem('email', userEmail);
            sessionStorage.setItem('role', res.roles);
            this.router.navigateByUrl('/adminProducts');
          }
          else if(Role == 'Supplier'){
            sessionStorage.setItem('token', res.token);
            sessionStorage.setItem('email', userEmail);
            sessionStorage.setItem('role', res.roles);
            this.router.navigateByUrl('/adminProducts');
          }


        },
        (error) => {
          this.errorMessage = 'Invalid Credentials';
          alert('Invalid Credentials');
        }

        );
      }
    }


  }




  ngOnInit(): void {

  }

}

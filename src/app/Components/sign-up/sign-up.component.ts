import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { User } from 'src/app/Models/user.model';
import { UserServiceService } from 'src/app/Services/user-service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {


  constructor(private userService:UserServiceService, private router:Router) { }

  signupForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    userName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
    phone:new FormControl('', [Validators.required, Validators.pattern('^(?:(?:\\+|0{0,2})91(\\s*[\\-]\\s*)?|[0]?)?[6789]\\d{9}$')]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&]{6,}$')]),
    roles: new FormControl(['User'])
  });



  signUp() {
    if(this.signupForm.touched && this.signupForm.valid){
      if(this.userService.registerUser(this.signupForm.value).subscribe((res) =>{
        alert('User Registered successfully, Please Login');
        this.router.navigateByUrl('/login');
      },
      (error)=>{
        if(error.status === 409){
          console.log('User Already Exists');
          alert('User Already Exists');
      }else{
        alert('User Registered successfully, Please Login');
        this.router.navigateByUrl('/login');
      }
    })){

    }

    }
    else{
      this.signupForm.markAllAsTouched();
    }

  }




  ngOnInit(): void {

  }


}

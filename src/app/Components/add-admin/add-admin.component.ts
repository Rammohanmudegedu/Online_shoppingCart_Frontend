import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user.model';
import { UserServiceService } from 'src/app/Services/user-service.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {


  constructor(private userService:UserServiceService, private router:Router) { }

  signupForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
    phone:new FormControl('', [Validators.required, Validators.pattern('^(?:(?:\\+|0{0,2})91(\\s*[\\-]\\s*)?|[0]?)?[789]\\d{9}$')]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&]{6,}$')]),
    roles: new FormControl(['Admin'])
  });


  signUp() {
    if(this.signupForm.touched && this.signupForm.valid){
      if(this.userService.registerUser(this.signupForm.value).subscribe((res) =>{
        alert('Admin Registered successfully');
        this.router.navigateByUrl('/users');
      },
      (error)=>{
        if(error.status === 409){
          console.log('User/Admin Already Exists');
          alert('User Already Exists');
      }else{
        alert('Admin Registered successfully');
        this.router.navigateByUrl('/users');
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

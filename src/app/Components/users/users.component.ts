import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user.model';
import { UserServiceService } from 'src/app/Services/user-service.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public users:any[]=[];
  constructor(private userService:UserServiceService, private router:Router) { }

  ngOnInit(): void {
    this.getUser()
  }

  getUser(){
    this.userService.getUserData().subscribe((data) =>{
      this.users=data;
    })
   }
   deleteUser(email: string){
    this.userService.deleteUser(email).subscribe((res) =>{
    })
    alert('users is deleted successfully');
    this.getUser();
   }
}

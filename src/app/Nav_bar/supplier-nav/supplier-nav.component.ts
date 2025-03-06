import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-supplier-nav',
  templateUrl: './supplier-nav.component.html',
  styleUrls: ['./supplier-nav.component.css']
})
export class SupplierNavComponent implements OnInit {

  public userEmail = sessionStorage.getItem('email') as string;
  constructor() { }

  ngOnInit(): void {
  }

  Logout(){
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('role');
  }

}

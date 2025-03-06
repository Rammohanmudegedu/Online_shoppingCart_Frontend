import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  fashionUrl:any[]=[
    {imageUrl : "assets/Home_Images/men_shirt.png", productName :"Men Shirt", price:220},
    {imageUrl : "assets/Home_Images/Tshirt.png",productName :"Men T-Shirt", price:350},
    {imageUrl : "assets/Home_Images/women-dress.png",productName :"Women Scart", price:330}
  ]

  electonicsUrl:any[]=[
    {imageUrl : "assets/Home_Images/laptop.png", productName :"Laptop", price:45000},
    {imageUrl : "assets/Home_Images/mobile.png", productName :"Mobile", price:23000},
    {imageUrl : "assets/Home_Images/computer.png", productName :"Computer", price:37000},
  ]


  ngOnInit(): void {

  }


}

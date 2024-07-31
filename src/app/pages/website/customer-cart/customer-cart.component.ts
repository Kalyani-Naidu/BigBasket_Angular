import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product/product.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-cart.component.html',
  styleUrl: './customer-cart.component.css'
})
export class CustomerCartComponent implements OnInit{

  cartList: any[] = [];
  noOfItemsInCart: number = 0;
  custId: number = 379;
  cartTotalAmt : number = 0;
  constructor(private prodsrv:ProductService,private router:Router){

  }

  getCartByCustId(){
    this.prodsrv.getCartDataByCustId(this.custId).subscribe((res:any)=>{
        this.cartList = res.data;
        this.noOfItemsInCart = this.cartList.length;
        this.getTotalAmount();
    })
  }

  getTotalAmount() {
    let total = 0;
    for (let item of this.cartList) {
      total += item.productPrice * item.quantity; 
    }
    this.cartTotalAmt = total;
  }

  ngOnInit(): void {
    this.getCartByCustId();
  }

  clearCart(){
    this.noOfItemsInCart = 0 ;
  }

  navigateToCheckOut(){
      this.router.navigate(['/checkout']);
  }

}

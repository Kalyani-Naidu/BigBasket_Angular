import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ProductService } from '../../../services/product/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [ RouterLink, CommonModule, RouterOutlet],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent  implements OnInit{

  categoryList: any[] = [];
  cartList: any[] = [];
  noOfItemsInCart: number = 0;
  custId: number = 379;
  constructor(private prodsrv:ProductService,private router:Router){

  }
  
  navigateToProducts(id: number){
    this.router.navigate(['/products',id]);
  }

  getAllCategory(){
    this.prodsrv.getCategory().subscribe((res:any)=>{
      this.categoryList = res.data;
    })
  }

  ngOnInit(): void {
    this.getAllCategory();
    this.getCartByCustId();
  }

  getCartByCustId(){
    this.prodsrv.getCartDataByCustId(this.custId).subscribe((res:any)=>{
        this.cartList = res.data;
        this.noOfItemsInCart = this.cartList.length;
    })
  }

  navigateToCart(){
    this.router.navigate(['/customerCart',this.custId])
  }
    
}

import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product/product.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-web-products',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './web-products.component.html',
  styleUrl: './web-products.component.css'
})
export class WebProductsComponent implements OnInit{

  
  productsList: any[] = [];
  categoryList: any[] = [];
  
  constructor(private prodsrv:ProductService,private router:Router){

  }

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategory();
  }

  getAllProducts(){
    this.prodsrv.getAllProducts().subscribe((res:any)=>{
      this.productsList = res.data;
    })
  }

  getAllCategory(){
    this.prodsrv.getCategory().subscribe((res:any)=>{
      this.categoryList = res.data;
    })
  }

  navigateToProducts(id: number){
    this.router.navigate(['/products',id]);
  }

  addToCart(productId: number){
      const addToCartObj = {
        "CartId": 0,
        "CustId": 379,
        "ProductId": productId,
        "Quantity": 1,
        "AddedDate": new Date()
      };
      this.prodsrv.addToCart(addToCartObj).subscribe((res:any)=>{
        if(res.result){
          alert("Product added to cart");
        }else{
            alert(res.message);
        }
      })
  }

}

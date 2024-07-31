import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { ProductService } from '../../../services/product/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  productObj:any = {
    "productId": 0,
    "productSku": "",
    "productName": "",
    "productPrice": 0,
    "productShortName": "",
    "productDescription": "",
    "createdDate": new Date(),
    "deliveryTimeSpan": "",
    "categoryId": 0,
    "productImageUrl": ""
  }

  categoryList: any[] = [];
  productsList: any[] = [];

  constructor(private productSrv: ProductService){

  }

  isSidePanelVisible: boolean = false;
  openSidePanel(){
    this.isSidePanelVisible = true;
  } 
  closeSidePanel(){
    this.isSidePanelVisible = false;
  }

  ngOnInit(): void {
    this.getAllCategory();
    this.getProducts();
  }

  getProducts(){
    this.productSrv.getAllProducts().subscribe((res:any)=>{
      this.productsList = res.data;
    })
  }

  getAllCategory(){
    this.productSrv.getCategory().subscribe((res:any)=>{
      this.categoryList = res.data;
    })
  }

  onSave(){
    this.productSrv.saveProduct(this.productObj).subscribe((res:any)=>{
      debugger;
      if(res.result){
        alert('Product created')
        this.getProducts();
      }
      else{
        alert(res.message)
      }
    })
  }

  onUpdate(){
    this.productSrv.updateProduct(this.productObj).subscribe((res:any)=>{
      debugger;
      if(res.result){
        alert('Product updated')
        this.getProducts();
      }
      else{
        alert(res.message)
      }
    })
  }

  onEdit(item:any){
    this.productObj = item;
    this.openSidePanel();
  }

  onDelete(item:any){
    const isDelete = confirm('Are you sure you want to delete')
    this.productSrv.deleteProduct(item.productId).subscribe((res:any)=>{
      debugger;
      if(isDelete){
        alert('Product deleted')
        this.getProducts();
      }
      else{
        alert(res.message)
      }
    })
  }

}

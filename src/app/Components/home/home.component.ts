import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategory } from '../../core/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { LowerCasePipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule,RouterLink, FormsModule,SearchPipe, UpperCasePipe , LowerCasePipe, TitleCasePipe , SlicePipe , TranslateModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit , OnDestroy {
addheart(arg0: any) {
throw new Error('Method not implemented.');
}
private readonly _ProductsService = inject(ProductsService);
private readonly _CategoriesService = inject(CategoriesService);
private readonly _CartService = inject(CartService);
private readonly _ToastrService = inject(ToastrService);
private readonly _NgxSpinnerService = inject(NgxSpinnerService);
productList:Iproduct[] = [];
categoriesList:Icategory[]=[];
text:string = "";
getAllproductSub !: Subscription

customOptionsMain: OwlOptions = {
  loop: true,
  mouseDrag: true,
  rtl:true,
  touchDrag: true,
  pullDrag: false,
  autoplay: true,
  autoplayTimeout : 2000,
  autoplayHoverPause:true,
  dots: true,
  navSpeed: 700,
  navText: ['', ''],
  items:1,
  nav: false
}
customOptionsCat: OwlOptions = {
  loop: true,
  mouseDrag: true,
  rtl:true,
  touchDrag: true,
  pullDrag: false,
  autoplay: true,
  autoplayTimeout : 2000,
  autoplayHoverPause:true,
  dots: false,
  navSpeed: 700,
  navText: [ '<i class="fa-solid fa-arrow-right"></i>','<i class="fa-solid fa-arrow-left"></i>'],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 6
    }
  },
  nav: true
}



ngOnInit(): void {
  this._CategoriesService.getAllcategories().subscribe({
    next:(res)=>{
      console.log(res.data);
      this.categoriesList = res.data;
    }
  })
 this.getAllproductSub = this._ProductsService.getAllproducts().subscribe({
    next:(res)=>{
      console.log(res.data)
      this.productList= res.data;
    }
  })
}
 ngOnDestroy(): void {
  this.getAllproductSub?.unsubscribe()
   
}

addCart(id:string):void{
  this._CartService.addProductToCart(id).subscribe({
    next:(res)=>{
      console.log(res);
      this._ToastrService.success(res.message , 'Ecommerce')
      this._CartService.cartNumber.next(res.numOfCartItems)
      console.log(this._CartService.cartNumber)
    }
  })
}


}

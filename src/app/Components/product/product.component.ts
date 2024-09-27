import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../core/services/products.service';
import { CurrencyPipe, LowerCasePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CurrencyPipe,TranslateModule,TitleCasePipe,UpperCasePipe,RouterLink  ,SearchPipe,LowerCasePipe,FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit ,OnDestroy {

  private readonly _ProductsService=inject(ProductsService)
  private readonly _ToastrService=inject(ToastrService)
  private readonly _CartService=inject(CartService)
  private readonly _WishService=inject(WishlistService)
  test:WritableSignal<string>=signal(" ")
  addcart(id:string):void{ 
    this._CartService.addProductToCart(id).subscribe({
      next:(res)=>{
        console.log(res)
        this._ToastrService.success( '🛵',res.message )
        // this._CartService.cartNumber.set(res.numOfCartItems)
        // console.log(this._CartService.cartNumber())

      }

    })
  }
  
  addheart(id:string):void{ 

    this._WishService.Addproducttowishlist(id).subscribe({
     next:(res)=>{
       console.log(res)
       this._ToastrService.success( res.status, "🩵")
       this._WishService.Getloggeduserwishlist().subscribe({
         next:(res)=>{
            console.log(res.count)
            this._WishService.wishNumber.set(res.count)
         }
       })
     }

   })
   }
   

productList:WritableSignal<Iproduct[]>=signal([]);

productsub !:Subscription
ngOnInit(): void {
  this.productsub=  this._ProductsService.getAllproducts().subscribe({
    next:(res)=>{
    this.productList.set(res.data)
    }

  })
}


ngOnDestroy(): void {
  this.productsub?.unsubscribe() 
}

}

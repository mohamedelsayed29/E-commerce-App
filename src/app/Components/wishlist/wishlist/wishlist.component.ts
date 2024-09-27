import { Component, inject, signal, WritableSignal } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { WishlistService } from '../../../core/services/wishlist.service';
import { Subscription } from 'rxjs';
import { Iwhish } from '../../../core/interfaces/iwish';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CurrencyPipe  , TranslateModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {

  private readonly _WishService=inject(WishlistService)
  private readonly _CartService=inject(CartService)
  private readonly _ToastrService=inject(ToastrService)
whishfall:WritableSignal<boolean>=signal(true)
    whishdata:WritableSignal<Iwhish[]>=signal([])
    whishsubmit!:Subscription
   ngOnInit(): void {
   this.whishsubmit=  this._WishService.Getloggeduserwishlist().subscribe({
        next:(res)=>{
        console.log(res.data)
         this.whishdata.set(res.data)
          this._WishService.wishNumber.set(res.count)
         if(res.status== "success"){
               this.whishfall.set(false)
         }
        }
   
       })

   }
   
ngOnDestroy(): void {
  this.whishsubmit?.unsubscribe()
}

removewhish(id:string):void{
  this._WishService.Removeproductfromwishlist(id).subscribe({
     next:(res)=>{
     console.log(res);
  this._WishService.Getloggeduserwishlist().subscribe({
     next:(res)=>{
       this.whishdata.set(res.data)
       this._WishService.wishNumber.set(res.count)
         this._ToastrService.info('Remove')

     }
   })
     }

   })
   }

   addtocart(id:string):void{

    this._CartService.addProductToCart(id).subscribe({
      next:(res)=>{
    console.log(res)
    this._ToastrService.success( '🛵',res.message )

        //  this._CartService.cartNumber.set(res.numOfCartItems)
          // console.log( this._CartService.cartNumber())


          this._WishService.Removeproductfromwishlist(id).subscribe({
            next:(res)=>{
              console.log(res)
            }
          })
         this._WishService.Getloggeduserwishlist().subscribe({
            next:(res)=>{
              this.whishdata.set(res.data)
              this._WishService.wishNumber.set(res.count)
       
            }
          })
      }

   })
}

}

import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MytranslateService } from '../../core/services/mytranslate.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink , RouterLinkActive , TranslateModule],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent implements OnInit {
wishNavNumber() {
throw new Error('Method not implemented.');
}
   readonly _AuthService = inject(AuthService);
   private readonly _MytranslateService = inject(MytranslateService);
   readonly _TranslateService = inject(TranslateService);
  private readonly _CartService = inject(CartService);
  countNumber : Number = 0;

  ngOnInit(): void {
    this._CartService.getProductsCart().subscribe({
      next:(res)=>{
        console.log('cart items',res)
        this._CartService.cartNumber.next(res.numOfCartItems)
      }
    })
    this._CartService.cartNumber.subscribe({
      next:(data)=>{
        this.countNumber = data;
      }
    })
  }

   change(lang: string):void{
    this._MytranslateService.changeLang(lang)
   }


}


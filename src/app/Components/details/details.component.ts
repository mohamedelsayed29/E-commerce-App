import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
    private readonly _ActivatedRoute = inject(ActivatedRoute);
    private readonly _ProductsService = inject(ProductsService);
    private readonly _CartService = inject(CartService)

    detailsProduct:Iproduct | null = null;
    ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe({
        next:(p)=>{
          let idProduct = p.get('id');
          this._ProductsService.getSpecificproducts(idProduct).subscribe({
            next:(res)=>{
              console.log(res.data);
              this.detailsProduct =res.data;
            },
            error:(err)=>{
              console.log(err)
            }
          })
        }
      })
    }

    addCart(id:string):void{
      this._CartService.addProductToCart(id).subscribe({
        next:(res)=>{
          console.log(res);
        },
        
      })
    }
}
 
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BrandsService } from '../../core/services/brands.service';
import { Ibrand } from '../../core/interfaces/ibrand';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [NgClass , RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {

  private readonly _BrandsService =inject(BrandsService)


brandsData:WritableSignal<Ibrand[]>=signal([])

brandId:WritableSignal<string|null>=signal(" ") ;
ngOnInit(): void {  
   this._BrandsService.getallbrands().subscribe({
    next:(res)=>{
      console.log(res.data)
       this.brandsData.set(res.data)
     
    }
  
   }) 
}
         

clicable:Ibrand[]=[]
click(id:string):void{
  this._BrandsService.Getspecificbrand(id).subscribe({
    next:(res)=>{
      this.clicable=res.data;
      console.log(res.data)
    }
  })
}
}



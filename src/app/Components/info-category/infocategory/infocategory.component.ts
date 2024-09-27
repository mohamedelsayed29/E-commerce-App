import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../../../core/services/categories.service';
import { Icategory } from '../../../core/interfaces/icategory';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-infocategory',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './infocategory.component.html',
  styleUrl: './infocategory.component.scss'
})
export class InfocategoryComponent implements OnInit {
  private readonly _ActivatedRoute=inject(ActivatedRoute)
  private readonly _CategoriesService=inject(CategoriesService)
  infoCategory:WritableSignal<Icategory>=signal({} as Icategory)    
ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next:(p)=>{
       let categoryId =p.get('id')
       this._CategoriesService.getSpecificcategory(categoryId!).subscribe({
        next:(res)=>{
          this.infoCategory.set(res.data)
             console.log(res.data)
        }
       })
    }
  })


}


 

}

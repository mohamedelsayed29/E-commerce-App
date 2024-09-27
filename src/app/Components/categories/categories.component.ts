import { Component, inject, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategory } from '../../core/interfaces/icategory';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  private readonly _CategoriesService=inject(CategoriesService)
  
  categoriessub !:Subscription
  categoriesList:WritableSignal<Icategory[]>=signal([]);
  ngOnInit(): void { 
 this.categoriessub = this._CategoriesService.getAllcategories().subscribe({
      next:(res)=>{
     this.categoriesList.set(res.data)
      }
    })
  }



ngOnDestroy(): void {
    this.categoriessub?.unsubscribe()
}


}


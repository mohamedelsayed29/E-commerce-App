import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  addToCart(id: string) {
    throw new Error('Method not implemented.');
  }

  constructor( private _HttpClient :HttpClient ) { 
    
   };

  cartNumber : BehaviorSubject<number > = new BehaviorSubject(0) ;

    
  addProductToCart(id:string):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart`, 
      {
        "productId": id
      },
 
    )
  }

  getProductsCart():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart` , 

    )
  }

  deleteSpecificCartItem(id:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`,

    )
  }

  updateProductQuantity(id:string,count:number):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`,
      {
          "count": count
      },

    )
  }
  clearCart():Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart` , 

    )
  }
} 

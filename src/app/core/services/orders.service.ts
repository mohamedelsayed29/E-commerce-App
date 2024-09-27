
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _HttpClient:HttpClient) { };
  
  myHeader:any = {token : localStorage.getItem('userToken')}

  checkOut(idCart:string | null , shipingDetails:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${idCart}?url=${environment.urlServer}` , 
      {
        "shippingAddress": shipingDetails
      }
    )
  }
}  

import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../core/services/orders.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule , NgClass],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _OrderService = inject(OrderService);
    orders: FormGroup = new FormGroup({
      details: new FormControl(null),
      phone: new FormControl(null ,[Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/) ]),
      city: new FormControl(null)
    })

    cartId:string |null = "";

    ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe({
        next:(params)=>{
        this.cartId =  params.get('id')
        },

      })
    }

    orderSubmit():void{
      console.log(this.orders.value)
      this._OrderService.checkOut(this.cartId,this.orders.value).subscribe({
        next:(res)=>{
          console.log(res);
          if(res.status === 'success'){
            res.session.url;
            window.open(res.session.url, '_self' )
          }
        },
        error:(err)=>{
          console.log(err)
        }
      })
    }
}

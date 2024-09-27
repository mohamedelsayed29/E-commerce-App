import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const _NgxSpinnerService = inject(NgxSpinnerService)
  
  

  if(req.url.includes('cart')){
    
  _NgxSpinnerService.show('loading3')

  }
  else{
    _NgxSpinnerService.show('loading2')

  }

  return next(req).pipe(finalize(()=>{


    _NgxSpinnerService.hide('loading3')

    _NgxSpinnerService.hide('loading2')


  }))




};

import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss'
})
export class ForgotpasswordComponent {

  private readonly _AuthService = inject(AuthService)
  private readonly _Router = inject(Router)

  step:number= 1;
  isloading:boolean = false;



  verfiEmail:FormGroup = new FormGroup({
    email:new FormControl(null,[Validators.required ,Validators.email])  
  })
  verfiCode:FormGroup = new FormGroup({
    resetCode:new FormControl(null,[Validators.required ,Validators.pattern(/^[0-9]{6}$/)])  
  })

  resetPassword:FormGroup = new FormGroup({
    email:new FormControl(null,[Validators.required ,Validators.email]),
    newPassword:new FormControl (null, [Validators.required , Validators.pattern(/^\w{6,}$/)]),
  
  })


  step1():void{
    this.isloading = true

    let email = this.verfiEmail.get('email')?.value;

    this.resetPassword.get('email')?.patchValue(email);

    this._AuthService.emailVerify(this.verfiEmail.value).subscribe({
      next:(res)=>{
        console.log(res)
        if(res.statusMsg == 'success'){
          this.step = 2;
        }
        this.isloading = false
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }




  step2():void{
    this.isloading = true

    this._AuthService.codeVerify(this.verfiCode.value).subscribe({
      next:(res)=>{
        console.log(res)
        if(res.status == 'Success'){
          this.step = 3;
        }
        this.isloading = false
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }





step3():void{
  this.isloading = true

  this._AuthService.resetPassword(this.resetPassword.value).subscribe({
    next:(res)=>{
      console.log(res)
      localStorage.setItem('UserToken', res.token)
      this._Router.navigate(['home'])
    },
    error:(err)=>{
      console.log(err)
    }
  })
}
}

import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, AbstractControl, FormBuilder, } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule , NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  private readonly _AuthService = inject(AuthService); 
  private readonly _Router = inject(Router); 
  // private readonly _FormBuilder = inject(FormBuilder); 
  msgSuccess:boolean = false;

  msgError:string ="";
  isLoading :boolean = false;


  // registerForm:FormGroup = this._FormBuilder.group({
  //   name : [null , [Validators.required , Validators.minLength(3), Validators.maxLength(20)]],
  //   email : [null , [Validators.required, Validators.email]],
  //   password : [null , [Validators.required, Validators.pattern(/^\w{6,}$/)]],
  //   rePassword : [null],
  //   phone : [null, [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/) ]]
  // }, {Validators:this.confirmPassword})

  registerForm : FormGroup = new FormGroup({
    name : new FormControl(null , [Validators.required , Validators.minLength(3), Validators.maxLength(20) ]),
    email : new FormControl(null, [Validators.required, Validators.email]),
    password : new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)]),
    rePassword : new FormControl(null),
    phone : new FormControl(null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/) ]),
    }, this.confirmPassword);

    registerSub !: Subscription
  registerSubmit():void
 {
  if(this.registerForm.valid)
  {
    this.isLoading =true;
  this.registerSub = this._AuthService.setRegisterForm(this.registerForm.value).subscribe({
        next:(res)=>{
          console.log(res)
          if(res.message == 'success')
          {
            Swal.fire({
              title: "Good job!",
              text: "You clicked the button!",
              icon: "success"
            });
            this.msgSuccess =true;
            setTimeout(() => {
              this._Router.navigate(['/login'])

            }, 1000);

            
          }
          this.isLoading =false;

        },
        error:(err:HttpErrorResponse)=>{
          this.msgError = err.error.message
          console.log(err)
          this.isLoading =false;

        }
      }
    )
  }
  else{
    this.registerForm.setErrors({mismatch:true})
    this.registerForm.markAllAsTouched()
  }

 }
//  test():void{
//   console.log(this.registerForm)
// }

ngOnDestroy(): void{
 this.registerSub?.unsubscribe()
}
confirmPassword(g:AbstractControl)
{
  if( g.get('password')?.value === g.get('rePassword')?.value )
  {
    return null
  }
  else
  {
    return{mismatch:true}
  }
}


}

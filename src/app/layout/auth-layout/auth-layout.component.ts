import { Component } from '@angular/core';
import { NavAuthComponent } from '../../Components/nav-auth/nav-auth.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../Components/footer/footer.component';
import { LoginComponent } from "../../Components/login/login.component";
import { ForgotpasswordComponent } from "../../Components/forgotpassword/forgotpassword.component";

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [(NavAuthComponent), RouterOutlet, FooterComponent, LoginComponent, ForgotpasswordComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss'
})
export class AuthLayoutComponent {

}

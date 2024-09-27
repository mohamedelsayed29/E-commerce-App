import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-notfound',
  standalone: true,
  imports: [RouterLink , RouterLinkActive],
  templateUrl: './notfound.component.html',
  styleUrl: './notfound.component.scss'
})
export class NotfoundComponent {

}

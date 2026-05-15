import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-authentication-container',
  imports: [RouterOutlet],
  templateUrl: './authentication-container.html',
  styleUrl: './authentication-container.scss',
})
export class AuthenticationContainer {
  private router = inject(Router);
  
  toHome(){
    this.router.navigate(['']);
  }
}

import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
})
export class LoginForm {
  private fb = new FormBuilder();
  
  isLoading = signal(false);
  hidePassword= signal(true);
  
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password:[ '', [Validators.required, Validators.minLength(6)]]
  });

  toggleHidePassword() {
    this.hidePassword.update(value => !value);
  }

  onTestAccountSelected(event: Event){
  }

  async onSubmit(){
  }

}

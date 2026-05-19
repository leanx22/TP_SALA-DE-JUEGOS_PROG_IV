import { Component, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signup-form.html',
  styleUrl: './signup-form.scss',
})
export class SignupForm {
  private fb = new FormBuilder();

  isLoading = signal(false);
  hidePassword = signal(true);
  errorMessage = signal<string|null>(null);

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password:[ '', [Validators.required, Validators.minLength(6)]]
  });

  toggleHidePassword() {
    this.hidePassword.update(value => !value);
  }

   async onSubmit(){}

}

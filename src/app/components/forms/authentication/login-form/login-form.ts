import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TestUsersLogins } from '../../../../model/supabase/testUsers';
import { LoginPayload } from '../../../../model/supabase/authenticationPayloads';
import { SupaAuthService } from '../../../../services/supabase/supa-auth-service';
import { FsSpinner } from '../../../shared/fs-spinner/fs-spinner';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule, RouterLink, FsSpinner],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
})
export class LoginForm {
  private fb = new FormBuilder();
  private supabaseAuth = inject(SupaAuthService);
  private router = inject(Router);
  testUsers = TestUsersLogins;
  errorMessage = signal<string|null>(null);

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
    const selectedIndex = (event.target as HTMLSelectElement).selectedIndex;
    this.loginForm.patchValue({
      email: this.testUsers[selectedIndex - 1].email,
      password: this.testUsers[selectedIndex - 1].password
    });
  }

  async onSubmit(){
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      return;
    }
    
    this.isLoading.set(true);
    
    await this.delay(1200);
    
    const raw = this.loginForm.getRawValue();
    const payload: LoginPayload = {
      email: raw.email!,
      password: raw.password!
    }

    try {
      const loginResult = await this.supabaseAuth.login(payload);
      console.log("Se inició una nueva sesión: "+loginResult.user.email);
      this.loginForm.reset();
      this.router.navigate(['']);
    }catch(error: any){
      this.errorMessage.set(error.message);
    }finally{
      this.isLoading.set(false);
    }
  }

  getErrorMessage(controlName: string){
    const control = this.loginForm.get(controlName);
    if(!control || !control.errors ||!control.touched) return '';

    if(control.hasError('required')){
      return 'Este campo es obligatorio.';
    }

    if(control.hasError('email')){
      return 'No es un email válido.';
    }

    if(control.hasError('minlength')){
      const requiredLength = control.errors!['minlength'].requiredLength;
      return 'El campo debe tener al menos ' + requiredLength + ' caracteres.';
    }

    return  'Campo inválido.';
  }

  delay = (ms: number) => new Promise(res => setTimeout(res, ms));

}

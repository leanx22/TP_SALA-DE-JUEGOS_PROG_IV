import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SupaAuthService } from '../../../../services/supabase/supa-auth-service';
import { RegistrationPayload } from '../../../../model/supabase/authenticationPayloads';
import { FsSpinner } from '../../../shared/fs-spinner/fs-spinner';

@Component({
  selector: 'app-signup-form',
  imports: [ReactiveFormsModule, RouterLink, FsSpinner],
  templateUrl: './signup-form.html',
  styleUrl: './signup-form.scss',
})
export class SignupForm {
  private readonly supabaseAuth = inject(SupaAuthService);
  private readonly router = inject(Router);
  private fb = new FormBuilder();

  isLoading = signal(false);
  hidePassword = signal(true);
  errorMessage = signal<string|null>(null);

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['',[Validators.required, Validators.minLength(3)]],
    lastName: ['',[Validators.required, Validators.minLength(3)]],
    age:['',[Validators.required, Validators.min(8), Validators.max(100)]],
    password:[ '', [Validators.required, Validators.minLength(6)]]
  });

  toggleHidePassword() {
    this.hidePassword.update(value => !value);
  }

   async onSubmit(){
    if(this.registerForm.invalid){ 
      this.registerForm.markAllAsTouched();  
      return;
    }

    this.isLoading.set(true);

    await this.delay(1200);

    const raw = this.registerForm.getRawValue();
    let ageToInt;
    try{
      ageToInt = parseInt(raw.age!);
    }catch(Error){
      this.errorMessage.set("La edad debe ser un número.");
      this.isLoading.set(false);
      return;
    }

    const registrationPayload: RegistrationPayload = {
      email: raw.email!,
      password: raw.password!,
      name: raw.name!,
      lastName: raw.lastName!,
      age:  ageToInt
    }

    this.errorMessage.set(null);
    

    try{
      const data = await this.supabaseAuth.signUp(registrationPayload);
      if(data.user){
        console.log("Registro exitoso: "+data.user.email);
      }
      this.registerForm.reset();
      this.router.navigate(['']);
    }catch(error: any){  
      this.errorMessage.set(error.message);
    }finally{
      this.isLoading.set(false);
    }    
   }

  getErrorMessage(controlName: string){
    const control = this.registerForm.get(controlName);
    if(!control || !control.errors ||!control.touched) return '';

    if(control.hasError('required')){
      return 'Campo es obligatorio!';
    }

    if(control.hasError('email')){
      return 'Email inválido.';
    }

    if(control.hasError('minlength')){
      const requiredLength = control.errors!['minlength'].requiredLength;
      return 'Al menos ' + requiredLength + ' caracteres!';
    }

    if(control.hasError('min') || control.hasError('max')){
      const min = control.errors!['min'].min;
      const max = control.errors!['max'].max;
      return 'Rango: ' + min + ' y ' + max + '.';
    }

    return  'Campo inválido.';
  }

  delay = (ms: number) => new Promise(res => setTimeout(res, ms));

}

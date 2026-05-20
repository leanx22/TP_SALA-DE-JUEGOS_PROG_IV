import { inject, Injectable, signal } from '@angular/core';
import { SUPABASE_CLIENT } from '../../../tokens/supabase-client.token';
import { User } from '@supabase/supabase-js';
import { Router } from '@angular/router';
import { SUPABASE_ERRORS } from '../../model/supabase/errorCodes';
import { LoginPayload, RegistrationPayload } from '../../model/supabase/authenticationPayloads';
import { UserMetadata } from '../../model/supabase/userMetadata';

@Injectable({
  providedIn: 'root',
})
export class SupaAuthService {
  private readonly client = inject(SUPABASE_CLIENT);
  private readonly router = inject(Router);
  private readonly loginRoute = '/session/login';

  private user = signal<User|null>(null);
  currentUser = this.user.asReadonly();

  constructor(){
    this.client.auth.getSession().then(({data})=>{
      this.user.set(data.session?.user ?? null);
    });

    this.client.auth.onAuthStateChange((_event, session) => {      
      this.user.set(session?.user ?? null);
      if(_event === 'SIGNED_OUT'){
        this.router.navigate([this.loginRoute]);
      }
    });
  }

  private getErrorcodeMessage(code: string){
    return SUPABASE_ERRORS[code] ?? 'Error desconocido';
  }

  public async login(payload: LoginPayload){
    const loginResult = await this.client.auth.signInWithPassword(payload);
    if(loginResult.error){
      throw new Error(loginResult.error.code ? this.getErrorcodeMessage(loginResult.error.code) : loginResult.error.message);
    }
    return loginResult.data;
  }

  public async signUp(payload: RegistrationPayload){
    const signUpResult = await this.client.auth.signUp({
      email: payload.email,
      password: payload.password,
      options:{
        data:{
          name: payload.name,
          lastName: payload.lastName,
          age: payload.age
        }
      }
    });

    if(signUpResult.error){
      throw new Error(signUpResult.error.code ? this.getErrorcodeMessage(signUpResult.error.code) : signUpResult.error.message);
    }
    return signUpResult.data;
  }

  public async getUser(){
    const result = await this.client.auth.getUser();
    if(result.error) return null;
    return result.data.user;
  }

  public async getSession(){
    const result = await this.client.auth.getSession();
    if(result.error) return null;
    return result.data.session;
  }

  public async getUserMetadata(){
    const result = await this.getSession();
    if(!result) return null;
    return result.user.user_metadata as UserMetadata;
  }

  public async logOut(){
    const results = await this.client.auth.signOut();
    if(results.error) return false;
    return true;
  }

}

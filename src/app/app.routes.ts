import { Routes } from '@angular/router';
import { guestGuard } from './guards/authentication/guest-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home-page/home-page').then((m) => m.HomePage),
  },
  {
    path: 'session',
    loadComponent: () =>
      import('./pages/authentication/authentication-container').then(
        (m) => m.AuthenticationContainer,
      ),
    canActivate: [guestGuard],
    canActivateChild: [guestGuard],
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./components/forms/authentication/login-form/login-form').then(
            (m) => m.LoginForm,
          ),
      },
      {
        path: 'sign-up',
        loadComponent: () =>
          import('./components/forms/authentication/signup-form/signup-form').then(
            (m) => m.SignupForm,
          ),
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'login',
      },
    ],
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about-page/about-page').then((m) => m.AboutPage),
  },
];

import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        loadComponent: () => import('./pages/home-page/home-page').then(m=>m.HomePage)
    },
    {
        path:'about',
        loadComponent: () => import('./pages/about-page/about-page').then(m=>m.AboutPage)
    }
];

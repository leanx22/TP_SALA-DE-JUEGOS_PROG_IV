import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgbCollapse, NgbCollapseModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  imports: [
    NgbCollapseModule,
    NgbCollapse,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    NgbDropdownModule
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  private router = inject(Router);

  isMenuOpen = false;
  isLogoCollapsed = true;
  absoluteRoutes = [''];
  hideRoutes = ['/session/login', '/session/sign-up'];

  toggleLogoCollapse(){
    this.isLogoCollapsed = !this.isLogoCollapsed;
  }

  isAbsolute():boolean{
    return this.absoluteRoutes.includes(this.router.url);
  }

  shouldHide():boolean{
    return this.hideRoutes.includes(this.router.url);
  }
}

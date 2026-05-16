import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgbCollapse, NgbCollapseModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SupaAuthService } from '../../../services/supabase/supa-auth-service';

@Component({
  selector: 'app-navbar',
  imports: [
    NgbCollapseModule,
    NgbCollapse,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    NgbDropdownModule,
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  private readonly supaAuth = inject(SupaAuthService);
  private readonly router = inject(Router);

  isMenuOpen = false;
  isLogoCollapsed = true;
  absoluteRoutes = [''];
  hideRoutes = ['/session/login', '/session/sign-up'];

  toggleLogoCollapse() {
    this.isLogoCollapsed = !this.isLogoCollapsed;
  }

  getCurrentUser() {
    return this.supaAuth.currentUser();
  }

  isAbsolute(): boolean {
    return this.absoluteRoutes.includes(this.router.url);
  }

  shouldHide(): boolean {
    return this.hideRoutes.includes(this.router.url);
  }

  async logOut() {
    await this.supaAuth.logOut();
    this.router.navigate(['/session/login']);
  }
}

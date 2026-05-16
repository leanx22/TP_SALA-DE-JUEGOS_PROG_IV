import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SupaAuthService } from '../../services/supabase/supa-auth-service';

export const guestGuard: CanActivateFn = async (route, state) => {
  const authService = inject(SupaAuthService);
  const router = inject(Router);

  const session = await authService.getSession();
  if (!session) {
    return true;
  }
  router.navigate(['/']);
  return false;
};

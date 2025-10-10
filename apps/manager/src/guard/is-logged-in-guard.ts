import { CanActivateFn, Router } from '@angular/router';
import { UserManagementService } from '@kickbase/UserManagement';
import { inject } from '@angular/core';
import { AppRouteDefinitions } from '@kickbase/definitions';

export const isLoggedInGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserManagementService);
  const router = inject(Router);
  const isUserLoggedIn = userService.isUserLoggedIn();

  if (!isUserLoggedIn) {
    router.navigateByUrl(AppRouteDefinitions.LOGIN);
  }

  return isUserLoggedIn;
};

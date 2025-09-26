import { Route } from '@angular/router';
import { AppRouteDefinitions } from '@kickbase/definitions';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('@kickbase/LoginManagement').then((comp) => comp.LoginManagement),
  },
  {
    path: AppRouteDefinitions.LOGIN,
    loadComponent: () =>
      import('@kickbase/LoginManagement').then((comp) => comp.LoginManagement),
  },
  {
    path: AppRouteDefinitions.STAFF_MANAGEMENT,
    loadComponent: () =>
      import('@kickbase/staff-planing').then((comp) => comp.StaffPlaning),
  }
];

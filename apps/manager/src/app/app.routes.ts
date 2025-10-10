import { Route } from '@angular/router';
import { AppRouteDefinitions } from '@kickbase/definitions';
import { isLoggedInGuard } from '../guard/is-logged-in-guard';
import { PageNotFound } from '../page-not-found/PageNotFound';

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
    path: AppRouteDefinitions.LEAGUE_SELECTION,
    loadComponent: () =>
      import('@kickbase/LoginManagement').then((comp) => comp.LeagueSelection),
    canActivate: [isLoggedInGuard],
  },
  {
    path: AppRouteDefinitions.STAFF_MANAGEMENT,
    loadComponent: () =>
      import('@kickbase/staff-planing').then((comp) => comp.StaffPlaning),
    canActivate: [isLoggedInGuard],
  },
  {
    path: '**',
    loadComponent: () => PageNotFound,
  },
];

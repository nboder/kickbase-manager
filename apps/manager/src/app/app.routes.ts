import { Route } from '@angular/router';
import { AppRouteDefinitions } from '@kickbase/definitions';
import { LeagueSelection } from '../../../../libs/login-management/src/lib/league-selection/LeagueSelection';

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
  },
  {
    path: AppRouteDefinitions.STAFF_MANAGEMENT,
    loadComponent: () =>
      import('@kickbase/staff-planing').then((comp) => comp.StaffPlaning),
  },
];

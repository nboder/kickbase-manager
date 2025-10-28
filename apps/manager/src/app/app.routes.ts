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
    path:
      AppRouteDefinitions.MANAGEMENT +
      '/:' +
      AppRouteDefinitions.PATH_PARAM_LEAGUE_ID,
    loadComponent: () =>
      import('@kickbase/AppNavigationContainer').then(
        (comp) => comp.AppNavigationContainer
      ),
    canActivate: [isLoggedInGuard],
    canActivateChild: [isLoggedInGuard],
    children: [
      {
        path: AppRouteDefinitions.STAFF_MANAGEMENT,
        loadComponent: () =>
          import('@kickbase/staff-planing').then((comp) => comp.StaffPlaning),
      },
      {
        path: AppRouteDefinitions.MANAGER_AVG_POINTS_FUN,
        loadComponent: () =>
          import('@kickbase/manager-average-point-fun-facts').then(
            (comp) => comp.ManagerAveragePointFunFacts
          ),
      },
    ],
  },
  {
    path: AppRouteDefinitions.LEAGUE_SELECTION,
    loadComponent: () =>
      import('@kickbase/LoginManagement').then((comp) => comp.LeagueSelection),
    canActivate: [isLoggedInGuard],
  },
  {
    path: '**',
    loadComponent: () => PageNotFound,
  },
];

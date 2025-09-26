import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('@kickbase/login').then((comp) => comp.Login),
  },
];

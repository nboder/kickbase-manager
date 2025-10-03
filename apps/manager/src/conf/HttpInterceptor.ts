import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { KickbaseApi } from '@kickbase/definitions';
import { inject } from '@angular/core';
import { UserManagementService } from '@kickbase/UserManagement';

export const headerInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  let modifiedHeaders = req.headers
    .set('Content-Type', `application/json`)
    .set('Accept', 'application/json');
  if (!req.url.includes(KickbaseApi.loginUrl())) {
    const userService = inject(UserManagementService);
    modifiedHeaders = modifiedHeaders.set(
      'Authorization',
      `Bearer ${sessionStorage.getItem(userService.TOKEN_SESSION_KEY)}`
    );
  }
  const modifiedReq = req.clone({
    headers: modifiedHeaders,
  });
  return next(modifiedReq);
};

import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const modifiedHeaders = req.headers
    .set('Content-Type', `application/json`)
    .set('Accept', 'application/json');
  const modifiedReq = req.clone({
    headers: modifiedHeaders,
  });
  return next(modifiedReq);
};

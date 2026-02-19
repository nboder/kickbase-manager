import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  KickbaseApi,
  LoginRequest,
  LoginResponse,
} from '@kickbase/definitions';

@Injectable({
  providedIn: 'root',
})
export class KickbaseLoginService {
  private readonly httpClient = inject(HttpClient);

  login(username: string, password: string): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(
      KickbaseApi.loginUrl(),
      new LoginRequest(username, password),
    );
  }
}

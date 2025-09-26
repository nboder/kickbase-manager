import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

export class LoginService {
  private readonly httpClient = inject(HttpClient);
}

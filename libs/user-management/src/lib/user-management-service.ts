import { Injectable } from '@angular/core';
import { LoginResponseLeague } from '@kickbase/definitions';
import { CurrentUser } from './current-user';

@Injectable({
  providedIn: 'root',
})
export class UserManagementService {
  readonly TOKEN_SESSION_KEY = 'accessToken';
  private currentUser: CurrentUser = CurrentUser.noUser();

  setCurrentUser(user: CurrentUser) {
    this.currentUser = user;
    sessionStorage.setItem(this.TOKEN_SESSION_KEY, user.token);
  }

  getCurrentUser(): CurrentUser {
    return this.currentUser;
  }
}

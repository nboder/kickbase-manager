import { Injectable } from '@angular/core';
import { CurrentUser } from './current-user';

@Injectable({
  providedIn: 'root',
})
export class UserManagementService {
  private readonly TOKEN_SESSION_KEY = 'accessToken';
  private readonly TOKEN_EXPIRATION_SESSION_KEY = 'accessTokenExpiry';
  private currentUser: CurrentUser = CurrentUser.noUser();

  setCurrentUser(user: CurrentUser) {
    this.currentUser = user;
    sessionStorage.setItem(this.TOKEN_SESSION_KEY, user.token);
    sessionStorage.setItem(
      this.TOKEN_EXPIRATION_SESSION_KEY,
      user.tokenExpiry.toISOString()
    );
  }

  getCurrentUser(): CurrentUser {
    return this.currentUser;
  }

  getUserAccessToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_SESSION_KEY);
  }

  isUserLoggedIn(): boolean {
    return true;
  }
}

import { Injectable } from '@angular/core';
import { CurrentUser } from './current-user';

@Injectable({
  providedIn: 'root',
})
export class UserManagementService {
  private readonly CURRENT_USER_KEY = 'currentUser';
  private currentUser: CurrentUser = CurrentUser.noUser();

  setCurrentUser(user: CurrentUser) {
    this.currentUser = user;
    sessionStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
  }

  getCurrentUser(): CurrentUser {
    const user = sessionStorage.getItem(this.CURRENT_USER_KEY);
    if (user) {
      const parsedUser: CurrentUser = JSON.parse(user);
      this.currentUser = new CurrentUser(
        parsedUser.username,
        parsedUser.id,
        parsedUser.token,
        parsedUser.tokenExpiry.toString()
      );
      return this.currentUser;
    }
    return this.currentUser;
  }

  logoutCurrentUser() {
    this.currentUser = CurrentUser.noUser();
    sessionStorage.removeItem(this.CURRENT_USER_KEY);
  }

  getUserAccessToken(): string | null {
    return this.getCurrentUser().token;
  }

  isUserLoggedIn(): boolean {
    const currentUser = this.getCurrentUser();
    if (currentUser.token && currentUser.tokenExpiry) {
      return Date.now().valueOf() < currentUser.tokenExpiry.valueOf();
    } else {
      return false;
    }
  }
}

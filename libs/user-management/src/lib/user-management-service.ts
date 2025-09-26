import { Injectable } from '@angular/core';
import { LoginResponseLeague } from '@kickbase/definitions';
import { CurrentUser } from './current-user';

@Injectable({
  providedIn: 'root',
})
export class UserManagementService {
  private currentUser: CurrentUser = CurrentUser.noUser();

  setCurrentUser(user: CurrentUser) {
    this.currentUser = user;
  }

  getCurrentUser(): CurrentUser {
    return this.currentUser;
  }
}

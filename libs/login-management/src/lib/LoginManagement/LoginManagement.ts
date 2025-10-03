import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KickbaseLoginService } from '../management/kickbase-login-service';
import {
  AppRouteDefinitions,
  KickbaseLeagueConstants,
  LoginResponse,
} from '@kickbase/definitions';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import {
  CurrentUser,
  LeagueManagementService,
  UserManagementService,
} from '@kickbase/UserManagement';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-login-management',
  imports: [FormsModule, MatInput, MatFormField, MatLabel],
  templateUrl: './LoginManagement.html',
  styleUrl: './LoginManagement.scss',
})
export class LoginManagement {
  username = signal<string>('');
  password = signal<string>('');

  private readonly loginService = inject(KickbaseLoginService);
  private readonly userService = inject(UserManagementService);
  private readonly leagueService = inject(LeagueManagementService);
  private readonly router = inject(Router);

  loginUser() {
    this.loginService.login(this.username(), this.password()).subscribe({
      next: (loginResponse: LoginResponse) => {
        this.userService.setCurrentUser(
          new CurrentUser(
            loginResponse.u.email,
            loginResponse.u.id,
            loginResponse.tkn
          )
        );
        const currentLeague = loginResponse.srvl.find(
          (value) =>
            value.id == KickbaseLeagueConstants.STROHGAEU_BUBEN_LEAGUE_ID
        );
        if (currentLeague) {
          this.leagueService.setLeagueInformation(
            currentLeague.lm.budget,
            currentLeague.lm.teamValue,
            currentLeague.lm.placement,
            currentLeague.lm.points
          );
        } else {
          console.error("League wasn't found. It is hardcoded!");
        }
        this.router.navigateByUrl(AppRouteDefinitions.STAFF_MANAGEMENT);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}

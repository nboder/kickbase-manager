import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KickbaseLoginService } from '../management/kickbase-login-service';
import { AppRouteDefinitions, LoginResponse } from '@kickbase/definitions';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import {
  CurrentUser,
  GeneralLeagueInformation,
  LeagueManagementService,
  UserManagementService,
} from '@kickbase/UserManagement';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatCheckbox } from '@angular/material/checkbox';
import {
  LocalStoragePersistenceManager,
  PersistenceManager,
} from '@kickbase/persistence-management';

@Component({
  selector: 'lib-login-management',
  imports: [
    FormsModule,
    MatInput,
    MatFormField,
    MatLabel,
    MatButton,
    MatCheckbox,
  ],
  templateUrl: './LoginManagement.html',
  styleUrl: './LoginManagement.scss',
})
export class LoginManagement implements OnInit, AfterViewInit {
  username = signal<string>('');
  password = signal<string>('');

  saveUserName = signal<boolean>(true);

  private readonly loginService = inject(KickbaseLoginService);
  private readonly userService = inject(UserManagementService);
  private readonly leagueService = inject(LeagueManagementService);
  private readonly router = inject(Router);
  private readonly persistence: PersistenceManager = inject(
    LocalStoragePersistenceManager,
  );

  ngOnInit(): void {
    if (this.userService.isUserLoggedIn()) {
      this.navigateAfterSuccessFullLogin();
    }
  }

  ngAfterViewInit(): void {
    const lastLoggedInUser = this.persistence.getLastLoggedInUsername();
    if (lastLoggedInUser) {
      this.username.set(lastLoggedInUser);
    }
  }

  loginUser() {
    this.loginService.login(this.username(), this.password()).subscribe({
      next: (loginResponse: LoginResponse) => {
        this.userService.setCurrentUser(
          new CurrentUser(
            loginResponse.u.email,
            loginResponse.u.id,
            loginResponse.tkn,
            loginResponse.tknex,
          ),
        );
        const leagues = loginResponse.srvl;
        this.leagueService.setAvailableLeagues(
          leagues.map((value) => {
            return new GeneralLeagueInformation(
              value.id,
              value.name,
              value.cpi,
              value.lm.budget,
              value.lm.teamValue,
              value.lm.placement,
              value.lm.points,
            );
          }),
        );
        if (this.saveUserName()) {
          this.persistence.saveLastLoggedInUsername(this.username());
        } else {
          this.persistence.removeLastLoggedInUsername();
        }
        this.navigateAfterSuccessFullLogin();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  private navigateAfterSuccessFullLogin() {
    this.router.navigateByUrl(AppRouteDefinitions.LEAGUE_SELECTION);
  }
}

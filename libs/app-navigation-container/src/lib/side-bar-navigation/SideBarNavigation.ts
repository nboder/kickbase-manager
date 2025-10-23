import { Component, inject, signal } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatCard, MatCardContent } from '@angular/material/card';
import { Router } from '@angular/router';
import { AppRouteDefinitions } from '@kickbase/definitions';
import { UserManagementService } from '@kickbase/UserManagement';

@Component({
  selector: 'lib-side-bar-navigation',
  imports: [MatDivider, MatCard, MatCardContent],
  templateUrl: './SideBarNavigation.html',
  styleUrl: './SideBarNavigation.scss',
})
export class SideBarNavigation {
  readonly sidebarItems = signal<SideBarItem[]>([
    SideBarItem.LEAGUE_SELECTION,
    // SideBarItem.STAFF_MANAGEMENT,
    // SideBarItem.FUN_STATS,
    SideBarItem.LOGOUT,
  ]);

  private readonly router = inject(Router);
  private readonly userService = inject(UserManagementService);

  sideBarElementClicked(sideBarItem: SideBarItem) {
    switch (sideBarItem) {
      case SideBarItem.LEAGUE_SELECTION:
        this.router.navigateByUrl(AppRouteDefinitions.LEAGUE_SELECTION);
        break;
      case SideBarItem.STAFF_MANAGEMENT:
        // this.router.navigate(['./' + AppRouteDefinitions.STAFF_MANAGEMENT]);
        break;
      // case SideBarItem.FUN_STATS:
      //   this.router.navigate([SideBarItem.FUN_STATS]);
      //   break;
      case SideBarItem.LOGOUT:
        console.log('Logout');
        this.userService.logoutCurrentUser();
        this.router.navigateByUrl(AppRouteDefinitions.LOGIN);
        break;
    }
  }
}

enum SideBarItem {
  LEAGUE_SELECTION = 'League Selection',
  STAFF_MANAGEMENT = 'Staff Management',
  FUN_STATS = 'Fun Stats',
  LOGOUT = 'Logout',
}

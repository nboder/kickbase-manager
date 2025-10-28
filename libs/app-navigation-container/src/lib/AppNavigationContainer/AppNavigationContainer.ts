import { Component, inject, OnInit, ViewChild } from '@angular/core';
import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
} from '@angular/material/sidenav';
import { MatIconButton } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { AppRouteDefinitions } from '@kickbase/definitions';
import {
  SideBarItem,
  SideBarNavigation,
} from '../side-bar-navigation/SideBarNavigation';
import { UserManagementService } from '@kickbase/UserManagement';

@Component({
  selector: 'lib-app-navigation-container',
  imports: [
    MatIconButton,
    MatToolbar,
    RouterOutlet,
    MatSidenavContainer,
    MatSidenav,
    MatSidenavContent,
    SideBarNavigation,
  ],
  templateUrl: './AppNavigationContainer.html',
  styleUrl: './AppNavigationContainer.css',
})
export class AppNavigationContainer implements OnInit {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly userService = inject(UserManagementService);

  @ViewChild('sideNav')
  private readonly sideNavigation: MatSidenav | undefined;

  ngOnInit(): void {
    this.router.navigate(['./' + AppRouteDefinitions.MANAGER_AVG_POINTS_FUN], {
      relativeTo: this.activatedRoute,
    });
  }

  handleSidebarItemClicked(item: SideBarItem) {
    this.sideNavigation?.close();
    switch (item) {
      case SideBarItem.LEAGUE_SELECTION:
        this.router.navigateByUrl(AppRouteDefinitions.LEAGUE_SELECTION);
        break;
      case SideBarItem.STAFF_MANAGEMENT:
        this.router.navigate([AppRouteDefinitions.STAFF_MANAGEMENT], {
          relativeTo: this.activatedRoute,
        });
        break;
      case SideBarItem.FUN_STATS:
        this.router.navigate([AppRouteDefinitions.MANAGER_AVG_POINTS_FUN], {
          relativeTo: this.activatedRoute,
        });
        break;
      case SideBarItem.LOGOUT:
        this.userService.logoutCurrentUser();
        this.router.navigateByUrl(AppRouteDefinitions.LOGIN);
        break;
    }
  }
}

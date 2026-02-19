import { Component, inject, output, signal } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatCard, MatCardContent } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRouteDefinitions } from '@kickbase/definitions';
import { UserManagementService } from '@kickbase/UserManagement';

@Component({
  selector: 'lib-side-bar-navigation',
  imports: [MatDivider, MatCard, MatCardContent],
  templateUrl: './SideBarNavigation.html',
  styleUrl: './SideBarNavigation.scss',
})
export class SideBarNavigation {
  sideBarItemClicked = output<SideBarItem>();

  readonly sidebarItems = signal<SideBarItem[]>([
    SideBarItem.LEAGUE_SELECTION,
    SideBarItem.STAFF_MANAGEMENT,
    SideBarItem.MATCH_UPS,
    SideBarItem.FUN_STATS,
    SideBarItem.LOGOUT,
  ]);

  sideBarElementClicked(sideBarItem: SideBarItem) {
    this.sideBarItemClicked.emit(sideBarItem);
  }
}

export enum SideBarItem {
  LEAGUE_SELECTION = 'League Selection',
  STAFF_MANAGEMENT = 'Staff Management',
  MATCH_UPS = 'Match Ups',
  FUN_STATS = 'Fun Stats',
  LOGOUT = 'Logout',
}

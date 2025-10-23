import { Component, inject, OnInit } from '@angular/core';
import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
} from '@angular/material/sidenav';
import { MatIconButton } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { AppRouteDefinitions } from 'libs/definitions/src';

@Component({
  selector: 'lib-app-navigation-container',
  imports: [
    MatIconButton,
    MatToolbar,
    RouterOutlet,
    MatSidenavContainer,
    MatSidenav,
    MatSidenavContent,
  ],
  templateUrl: './AppNavigationContainer.html',
  styleUrl: './AppNavigationContainer.css',
})
export class AppNavigationContainer implements OnInit {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.router.navigate(['./' + AppRouteDefinitions.STAFF_MANAGEMENT], {
      relativeTo: this.activatedRoute,
    });
  }
}

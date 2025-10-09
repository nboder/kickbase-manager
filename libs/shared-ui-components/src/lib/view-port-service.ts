import { inject, Injectable, signal } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root',
})
export class ViewPortService {
  isMobileLayout = signal(false);

  private breakpointObserver = inject(BreakpointObserver);

  constructor() {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((breakpoint) => {
        if (breakpoint.matches) {
          this.isMobileLayout.set(true);
        }
      });

    this.breakpointObserver
      .observe([Breakpoints.Web, Breakpoints.Tablet])
      .subscribe((result) => {
        if (result.matches) {
          this.isMobileLayout.set(false);
        }
      });
  }
}

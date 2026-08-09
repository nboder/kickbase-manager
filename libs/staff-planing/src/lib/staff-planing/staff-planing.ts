import {
  Component,
  computed,
  inject,
  OnInit,
  Signal,
  signal,
  ViewChild,
} from '@angular/core';
import { CurrencyPipe, NgTemplateOutlet } from '@angular/common';
import { TransferMarket } from '../transfer-market/transfer-market';
import { MoneyOverview } from '../money-overview/MoneyOverview';
import { SquadView } from '../squad-view/squad-view.component';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { ViewPortService } from '@kickbase/PositionMarker';
import { ActivatedRoute } from '@angular/router';
import { AppRouteDefinitions } from '@kickbase/definitions';
import { StaffPlanningController } from './controller/staff-planning-controller';
import { StaffPlanningMobileController } from './controller/staff-planning-mobile-controller';
import { StaffPlanningWebController } from './controller/staff-planning-web-controller';

@Component({
  selector: 'lib-staff-planing',
  imports: [
    TransferMarket,
    MoneyOverview,
    SquadView,
    MatTabGroup,
    MatTab,
    NgTemplateOutlet,
  ],
  providers: [CurrencyPipe],
  templateUrl: './staff-planing.html',
  styleUrls: ['./staff-planing.scss', '../shared.scss'],
})
export class StaffPlaning implements OnInit {
  @ViewChild(SquadView)
  private squadView: SquadView | undefined;

  viewPortService = inject(ViewPortService);
  activatedRoute = inject(ActivatedRoute);

  controller: Signal<StaffPlanningController> = computed(() => {
    if (this.viewPortService.isMobileLayout()) {
      return new StaffPlanningMobileController();
    } else {
      return new StaffPlanningWebController();
    }
  });

  sumOfBuyingPlayer = signal<number>(0);
  selectedLeaguedId = signal<string>('');
  selectedTabIndex = signal<number>(0);

  private touchStartX = 0;
  private touchStartY = 0;

  ngOnInit(): void {
    const leagueId = this.activatedRoute.parent?.snapshot.paramMap.get(
      AppRouteDefinitions.PATH_PARAM_LEAGUE_ID
    );
    if (leagueId) {
      this.selectedLeaguedId.set(leagueId);
      this.selectedTabIndex.set(this.controller().currentActiveViewIndex());
    } else {
      console.log(
        'URL has been modified. This will result in an error Page in the near future.'
      );
    }
  }

  onTabChanged(index: number): void {
    this.selectedTabIndex.set(index);
    this.controller().activeViewHasChanged(index);
  }

  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.touches[0].clientX;
    this.touchStartY = event.touches[0].clientY;
  }

  onTouchEnd(event: TouchEvent): void {
    const touchEndX = event.changedTouches[0].clientX;
    const touchEndY = event.changedTouches[0].clientY;
    const deltaX = touchEndX - this.touchStartX;
    const deltaY = touchEndY - this.touchStartY;

    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        this.swipeToNextTab();
      } else {
        this.swipeToPreviousTab();
      }
    }
  }

  private swipeToNextTab(): void {
    const nextIndex = Math.min(this.selectedTabIndex() + 1, 2);
    this.selectedTabIndex.set(nextIndex);
    this.controller().activeViewHasChanged(nextIndex);
  }

  private swipeToPreviousTab(): void {
    const nextIndex = Math.max(this.selectedTabIndex() - 1, 0);
    this.selectedTabIndex.set(nextIndex);
    this.controller().activeViewHasChanged(nextIndex);
  }

  sumOfSoldPlayers(): number {
    if (this.squadView) {
      return this.squadView.sumOfSoldPlayers();
    } else {
      return 0;
    }
  }

  predictions24h(): number[] {
    if (this.squadView) {
      return this.squadView.twentyFourHourMarketValuePredictions();
    } else {
      return [];
    }
  }
  predictions24hOnlyBenchPlayer(): number[] {
    if (this.squadView) {
      return this.squadView.twentyFourHourMarketValuePredictionsOnlyBenchPlayer();
    } else {
      return [];
    }
  }

  predictions7Days(): number[] {
    if (this.squadView) {
      return this.squadView.sevenDayMarketValuePredictions();
    } else {
      return [];
    }
  }

  predictions7DaysOnlyBenchPlayer(): number[] {
    if (this.squadView) {
      return this.squadView.sevenDayMarketValuePredictionsOnlyBenchPlayer();
    } else {
      return [];
    }
  }
}

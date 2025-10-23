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

  ngOnInit(): void {
    const leagueId = this.activatedRoute.parent?.snapshot.paramMap.get(
      AppRouteDefinitions.PATH_PARAM_LEAGUE_ID
    );
    if (leagueId) {
      this.selectedLeaguedId.set(leagueId);
    } else {
      console.log(
        'URL has been modified. This will result in an error Page in the near future.'
      );
    }
  }

  sumOfSoldPlayers(): number {
    if (this.squadView) {
      return this.squadView.sumOfSOldPlayers();
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

import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { TransferMarket } from '../transfer-market/transfer-market';
import { MoneyOverview } from '../money-overview/MoneyOverview';
import { SquadView } from '../squad-view/squad-view.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { ViewPortService } from '@kickbase/PositionMarker';

@Component({
  selector: 'lib-staff-planing',
  imports: [TransferMarket, MoneyOverview, SquadView, MatTabGroup, MatTab],
  providers: [CurrencyPipe],
  templateUrl: './staff-planing.html',
  styleUrls: ['./staff-planing.scss', '../shared.scss'],
})
export class StaffPlaning {
  @ViewChild(SquadView)
  private squadView: SquadView | undefined;

  viewPortService = inject(ViewPortService);

  sumOfBuyingPlayer = signal<number>(0);

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

  predictions7Days(): number[] {
    if (this.squadView) {
      return this.squadView.sevenDayMarketValuePredictions();
    } else {
      return [];
    }
  }
}

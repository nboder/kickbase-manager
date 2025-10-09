import {
  Component,
  computed,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { KickbaseLeagueConstants, MoneyPipe } from '@kickbase/definitions';
import { ManagerService } from '../service/manager-service';
import { MarketValueTrend, ResponsiveView } from '@kickbase/PositionMarker';

@Component({
  selector: 'lib-money-overview',
  imports: [MoneyPipe, MarketValueTrend],
  templateUrl: './MoneyOverview.html',
  styleUrls: ['./MoneyOverview.scss', '../shared.scss'],
})
export class MoneyOverview implements OnInit, ResponsiveView {
  showMobileLayout = input<boolean>(false);

  sumOfSoldPlayers = input.required<number>();
  sumOfBuyingPlayer = input.required<number>();
  teamValue = signal<number>(0);
  profit = signal<number>(0);
  budget = signal<number>(0);
  twentyFourHourPredictions = input.required<number[]>();
  sevenDayPredictions = input.required<number[]>();

  finalAccountBalance = computed(() => {
    return this.budget() + this.sumOfSoldPlayers() - this.sumOfBuyingPlayer();
  });

  twentyFourHourPrediction(): number {
    return this.twentyFourHourPredictions().reduce((a, b) => a + b, 0);
  }

  sevenDayPrediction(): number {
    return this.sevenDayPredictions().reduce((a, b) => a + b, 0);
  }

  private readonly managerService = inject(ManagerService);

  ngOnInit(): void {
    this.managerService
      .fetchManagerInformation(
        KickbaseLeagueConstants.STROHGAEU_BUBEN_LEAGUE_ID,
        KickbaseLeagueConstants.BOB_USER_ID
      )
      .subscribe({
        next: (data) => {
          this.teamValue.set(data.tv);
          this.profit.set(data.prft);
        },
        error: (err) => console.log(err),
      });

    this.managerService
      .fetchBudgetInformation(KickbaseLeagueConstants.STROHGAEU_BUBEN_LEAGUE_ID)
      .subscribe({
        next: (data) => {
          this.budget.set(data.b);
        },
        error: (err) => console.log(err),
      });
  }
}

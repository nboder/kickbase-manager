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

@Component({
  selector: 'lib-money-overview',
  imports: [MoneyPipe],
  templateUrl: './MoneyOverview.html',
  styleUrls: ['./MoneyOverview.scss', '../shared.scss'],
})
export class MoneyOverview implements OnInit {
  sumOfSoldPlayers = input.required<number>();
  sumOfBuyingPlayer = input.required<number>();
  teamValue = signal<number>(0);
  profit = signal<number>(0);
  budget = signal<number>(0);

  finalAccountBalance = computed(() => {
    return this.budget() + this.sumOfSoldPlayers() - this.sumOfBuyingPlayer();
  });

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

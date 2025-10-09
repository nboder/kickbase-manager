import {
  Component,
  computed,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { MoneyPipe } from '@kickbase/definitions';
import { ManagerService } from '../service/manager-service';
import { MarketValueTrend, ResponsiveView } from '@kickbase/PositionMarker';
import { UserManagementService } from '@kickbase/UserManagement';

@Component({
  selector: 'lib-money-overview',
  imports: [MoneyPipe, MarketValueTrend],
  templateUrl: './MoneyOverview.html',
  styleUrls: ['./MoneyOverview.scss', '../shared.scss'],
})
export class MoneyOverview implements OnInit, ResponsiveView {
  showMobileLayout = input<boolean>(false);
  selectedLeagueId = input.required<string>();
  sumOfSoldPlayers = input.required<number>();
  sumOfBuyingPlayer = input.required<number>();
  twentyFourHourPredictions = input.required<number[]>();
  sevenDayPredictions = input.required<number[]>();

  teamValue = signal<number>(0);
  profit = signal<number>(0);
  budget = signal<number>(0);

  finalAccountBalance = computed(() => {
    return this.budget() + this.sumOfSoldPlayers() - this.sumOfBuyingPlayer();
  });

  private userService = inject(UserManagementService);

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
        this.selectedLeagueId(),
        this.userService.getCurrentUser().id
      )
      .subscribe({
        next: (data) => {
          this.teamValue.set(data.tv);
          this.profit.set(data.prft);
        },
        error: (err) => console.log(err),
      });

    this.managerService
      .fetchBudgetInformation(this.selectedLeagueId())
      .subscribe({
        next: (data) => {
          this.budget.set(data.b);
        },
        error: (err) => console.log(err),
      });
  }
}

import {
  Component,
  computed,
  ElementRef,
  inject,
  OnInit,
  output,
  QueryList,
  signal,
  ViewChildren,
} from '@angular/core';
import {
  KickbaseLeagueConstants,
  MoneyPipe,
  TransferMarketDefinitions,
  TransferMarketPlayer,
} from '@kickbase/definitions';
import { TransferMarketService } from '../service/transfer-market-service';
import { DecimalPipe } from '@angular/common';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatButton } from '@angular/material/button';
import { TransferMarketCard } from '../transfer-market-card/TransferMarketCard';

@Component({
  selector: 'lib-transfer-market',
  imports: [MatSlideToggle, MatButton, TransferMarketCard],
  providers: [DecimalPipe, MoneyPipe],
  templateUrl: './transfer-market.html',
  styleUrls: ['./transfer-market.scss', '../shared.scss'],
})
export class TransferMarket implements OnInit {
  sumOfBuyingPlayers = output<number>();

  private transferMarket = signal<TransferMarketPlayer[]>([]);
  shownTransferMarketPlayers = computed(() => {
    if (this.showOnlyPointMachines()) {
      return this.transferMarket().filter((player) => {
        return (
          player.averagePoints >=
          TransferMarketDefinitions.PointingMachineThreshold
        );
      });
    } else {
      return this.transferMarket();
    }
  });

  @ViewChildren('overpayment')
  private readonly overPayments: QueryList<ElementRef> | undefined;
  private readonly transferMarketService = inject(TransferMarketService);
  showGoldDiggers = signal<boolean>(false);
  showPositiveMarketValueTrends = signal<boolean>(true);
  showOnlyPointMachines = signal<boolean>(false);

  readonly showHoursThreshold = 1.0;
  readonly showDaysThreshold = 48.0;
  private readonly playersMarkedForBuying = new Set<string>([]);
  private readonly transfermarketLookup = new Map<string, TransferMarketPlayer>(
    []
  );

  ngOnInit(): void {
    this.transferMarketService
      .fetchTransferMarketInformation(
        KickbaseLeagueConstants.STROHGAEU_BUBEN_LEAGUE_ID
      )
      .subscribe({
        next: (data) => {
          const transferData = data.it.map((data) => {
            const transferPlayer = new TransferMarketPlayer(data);
            this.transfermarketLookup.set(
              transferPlayer.playerId,
              transferPlayer
            );
            this.fetchDetailOfPlayer(transferPlayer.playerId);
            return transferPlayer;
          });
          this.transferMarket.set(
            transferData.sort(
              (a, b) => a.transferExpiringSeconds - b.transferExpiringSeconds
            )
          );
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  togglePlayerForBuying(transferredPlayer: TransferMarketPlayer, event: Event) {
    const element = event.target as HTMLInputElement;
    if (element.checked) {
      this.playersMarkedForBuying.add(transferredPlayer.playerId);
    } else {
      this.playersMarkedForBuying.delete(transferredPlayer.playerId);
    }
    const input = this.findInputElementForPlayer(transferredPlayer.playerId);
    if (input) {
      input.nativeElement.value = element.checked
        ? transferredPlayer.marketValue
        : '';
    }
  }

  isNotPlayerMarkedForBuying(player: TransferMarketPlayer): boolean {
    return !this.playersMarkedForBuying.has(player.playerId);
  }

  acceptBuyingOrders() {
    let resultValueOfBuyingPlayers = 0;
    this.playersMarkedForBuying.forEach((playerId) => {
      const paymentForPlayer = this.findInputElementForPlayer(playerId);
      if (paymentForPlayer) {
        resultValueOfBuyingPlayers += parseInt(
          paymentForPlayer.nativeElement.value
        );
      }
    });
    this.sumOfBuyingPlayers.emit(resultValueOfBuyingPlayers);
  }

  private fetchDetailOfPlayer(playerId: string): void {
    this.transferMarketService
      .fetchPlayerDetails(
        KickbaseLeagueConstants.STROHGAEU_BUBEN_LEAGUE_ID,
        playerId
      )
      .subscribe({
        next: (data) => {
          const currentPlayer = this.transfermarketLookup.get(playerId);
          if (currentPlayer) {
            currentPlayer.teamName = data.tn;
            currentPlayer.twentyForHoursTrend = data.tfhmvt;
          }
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  shouldShowGoldDiggerOrPositiveMarketValueTrend(
    player: TransferMarketPlayer
  ): boolean {
    return (
      (this.showGoldDiggers() &&
        player.twentyForHoursTrend >
          TransferMarketDefinitions.GoldDiggerThresholdInEuro) ||
      (this.showPositiveMarketValueTrends() && player.twentyForHoursTrend > 0)
    );
  }

  private findInputElementForPlayer(playerId: string): ElementRef | undefined {
    if (this.overPayments) {
      return this.overPayments.find((overpayment) => {
        return overpayment.nativeElement.id === playerId;
      });
    } else {
      return undefined;
    }
  }
}

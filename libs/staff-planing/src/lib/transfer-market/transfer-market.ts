import {
  Component,
  computed,
  inject,
  OnInit,
  output,
  signal,
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
import { TransferMarketCard } from '../transfer-market-card/TransferMarketCard';

@Component({
  selector: 'lib-transfer-market',
  imports: [MatSlideToggle, TransferMarketCard],
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

  private readonly transferMarketService = inject(TransferMarketService);
  showOnlyPointMachines = signal<boolean>(false);

  private readonly transferMarketLookup = new Map<string, TransferMarketPlayer>(
    []
  );

  private marketValueUpdateAlreadyShown = signal<boolean>(false);
  private nextMarketValueUpdate: Date | undefined;

  ngOnInit(): void {
    this.transferMarketService
      .fetchTransferMarketInformation(
        KickbaseLeagueConstants.STROHGAEU_BUBEN_LEAGUE_ID
      )
      .subscribe({
        next: (data) => {
          const transferData = data.it.map((data) => {
            const transferPlayer = new TransferMarketPlayer(data);
            this.transferMarketLookup.set(
              transferPlayer.playerId,
              transferPlayer
            );
            this.fetchDetailOfPlayer(transferPlayer.playerId);
            return transferPlayer;
          });
          this.nextMarketValueUpdate = new Date(data.mvud);
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

  acceptBuyingOrders() {
    const buyingValue = this.transferMarket().reduce((a, b) => {
      return a + b.currentBid;
    }, 0);
    this.sumOfBuyingPlayers.emit(buyingValue);
  }

  // shouldShowMarketValueUpdateBeforePlayer(
  //   nextPlayer: TransferMarketPlayer
  // ): boolean {
  //   let showMarketValueUpdate = false;
  //   if (!this.marketValueUpdateAlreadyShown() && this.nextMarketValueUpdate) {
  //     const expiration =
  //       (Date.now() / 1000) + nextPlayer.transferExpiringSeconds;
  //     const marketValueUpdate = this.nextMarketValueUpdate.valueOf() / 1000;
  //     showMarketValueUpdate = marketValueUpdate < expiration;
  //     this.marketValueUpdateAlreadyShown.set(showMarketValueUpdate);
  //   }
  //   return showMarketValueUpdate;
  // }

  private fetchDetailOfPlayer(playerId: string): void {
    this.transferMarketService
      .fetchPlayerDetails(
        KickbaseLeagueConstants.STROHGAEU_BUBEN_LEAGUE_ID,
        playerId
      )
      .subscribe({
        next: (data) => {
          const currentPlayer = this.transferMarketLookup.get(playerId);
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
}

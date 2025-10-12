import {
  AfterViewInit,
  Component,
  computed,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import {
  MoneyPipe,
  TransferMarketDefinitions,
  TransferMarketPlayer,
} from '@kickbase/definitions';
import { TransferMarketService } from '../service/transfer-market-service';
import { DecimalPipe } from '@angular/common';
import { TransferMarketCard } from '../transfer-market-card/TransferMarketCard';
import { ResponsiveView } from '@kickbase/PositionMarker';

@Component({
  selector: 'lib-transfer-market',
  imports: [TransferMarketCard],
  providers: [DecimalPipe, MoneyPipe],
  templateUrl: './transfer-market.html',
  styleUrls: ['./transfer-market.scss', '../shared.scss'],
})
export class TransferMarket implements OnInit, ResponsiveView {
  showMobileLayout = input<boolean>(false);
  selectedLeagueId = input.required<string>();

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
      .fetchTransferMarketInformation(this.selectedLeagueId())
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
          this.acceptBuyingOrders()
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  private acceptBuyingOrders() {
    const buyingValue = this.transferMarket().reduce((a, b) => {
      return a + b.currentOffer.offer;
    }, 0);
    this.sumOfBuyingPlayers.emit(buyingValue);
  }

  offerPlaced(player: TransferMarketPlayer) {
    this.transferMarketService
      .placeOffer(
        this.selectedLeagueId(),
        player.playerId,
        player.currentOffer.offer
      )
      .subscribe({
        next: (data) => {
          player.currentOffer.offerId = data.ofi;
        },
      });
    this.acceptBuyingOrders();
  }

  offerWithDrawn(player: TransferMarketPlayer) {
    if (player.currentOffer.offerId != undefined) {
      this.transferMarketService
        .withdrawPlayerOffer(
          this.selectedLeagueId(),
          player.playerId,
          player.currentOffer.offerId
        )
        .subscribe({
          next: (data) => {
            console.log('Offer has been whithdrawn');
          },
        });
      this.acceptBuyingOrders();
    } else {
      console.error("Offer couldn't be whithdrawn");
    }
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
      .fetchPlayerDetails(this.selectedLeagueId(), playerId)
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

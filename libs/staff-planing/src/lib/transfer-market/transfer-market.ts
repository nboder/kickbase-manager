import {
  Component,
  computed,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import {
  KickbaseApi,
  MoneyPipe,
  PointHistory,
  TransferMarketPlayer,
} from '@kickbase/definitions';
import { TransferMarketService } from '@kickbase/api-services';
import { DecimalPipe } from '@angular/common';
import { TransferMarketCard } from '../transfer-market-card/TransferMarketCard';
import { Divider, ResponsiveView } from '@kickbase/PositionMarker';

@Component({
  selector: 'lib-transfer-market',
  imports: [TransferMarketCard, Divider],
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
    return this.transferMarket();
  });

  private readonly transferMarketService = inject(TransferMarketService);

  private readonly transferMarketLookup = new Map<string, TransferMarketPlayer>(
    []
  );

  private nextMarketValueUpdate: Date | undefined;
  private matchDayDate: Date | undefined;
  matchDay: number | undefined;

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
          this.matchDayDate = new Date(data.dt);
          this.matchDay = data.day;
          this.transferMarket.set(
            transferData.sort(
              (a, b) => a.transferExpiringSeconds - b.transferExpiringSeconds
            )
          );
          this.acceptBuyingOrders();
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
            console.log(`Offer has been whithdrawn ${data}`);
          },
        });
      this.acceptBuyingOrders();
    } else {
      console.error("Offer couldn't be whithdrawn");
    }
  }

  shouldLoadPerformanceOfPlayer(player: TransferMarketPlayer) {
    this.transferMarketService
      .fetchPlayerPerformance(this.selectedLeagueId(), player.playerId)
      .subscribe({
        next: (data) => {
          const currentSeason = data.it.find(
            (value) => value.ti === KickbaseApi.CURRENT_SEASON_PERFORMANCE_NAME
          );
          if (currentSeason) {
            const currentPlayer = this.transferMarketLookup.get(
              player.playerId
            );
            if (currentPlayer) {
              currentPlayer.pointHistory = currentSeason.ph
                .filter((pointHistory) => pointHistory.mp != undefined)
                .map((playedGame) => new PointHistory(playedGame));
            }
          } else {
            console.log(
              'Could not find current Season in Data: ' +
                KickbaseApi.CURRENT_SEASON_PERFORMANCE_NAME
            );
          }
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  shouldShowMarketValueUpdate(index: number, isFirstElement: boolean): boolean {
    if (this.nextMarketValueUpdate) {
      return this.shouldShowDividerBetweenPlayers(
        index,
        isFirstElement,
        this.nextMarketValueUpdate
      );
    }
    return false;
  }

  shouldShowMatchDayDivider(index: number, isFirstElement: boolean): boolean {
    if (this.matchDayDate && this.matchDay) {
      return this.shouldShowDividerBetweenPlayers(
        index,
        isFirstElement,
        this.matchDayDate
      );
    }
    return false;
  }

  private shouldShowDividerBetweenPlayers(
    index: number,
    isFirstElement: boolean,
    dividerDate: Date
  ): boolean {
    const expirationOfCurrentPlayer =
      Date.now() / 1000 +
      this.shownTransferMarketPlayers()[index].transferExpiringSeconds;
    const updateValue = dividerDate.valueOf() / 1000;
    if (isFirstElement) {
      return updateValue < expirationOfCurrentPlayer;
    } else {
      const expirationOfPreviousPlayer =
        Date.now() / 1000 +
        this.shownTransferMarketPlayers()[index - 1].transferExpiringSeconds;

      return (
        updateValue > expirationOfPreviousPlayer &&
        updateValue < expirationOfCurrentPlayer
      );
    }
  }

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

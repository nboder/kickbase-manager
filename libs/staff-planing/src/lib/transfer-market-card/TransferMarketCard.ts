import { Component, inject, input, output, signal } from '@angular/core';
import { MatCard } from '@angular/material/card';
import {
  ExpirationTimePipe,
  MoneyPipe,
  TransferMarketPlayer,
} from '@kickbase/definitions';
import {
  PlayerNameAndValue,
  PointIndication,
  PointIndicatorView,
  PositionMarker,
} from '@kickbase/PositionMarker';
import { MatDialog } from '@angular/material/dialog';
import {
  TransferMarketBidDialog,
  TransferMarketBidDialogStatus,
  TransferMarketOutputBidData,
} from '../transfer-market-bid-dialog/TransferMarketBidDialog';
import { MatDivider } from '@angular/material/divider';
import { ContentDeliveryService } from '@kickbase/api-services';

@Component({
  selector: 'lib-transfer-market-card',
  imports: [
    MatCard,
    PositionMarker,
    ExpirationTimePipe,
    PlayerNameAndValue,
    MoneyPipe,
    MatDivider,
    PointIndicatorView,
  ],
  templateUrl: './TransferMarketCard.html',
  styleUrls: ['./TransferMarketCard.scss', '../shared.scss'],
})
export class TransferMarketCard {
  transferMarketPlayer = input.required<TransferMarketPlayer>();
  offerWithdrawn = output<TransferMarketPlayer>();
  offerPlaced = output<TransferMarketPlayer>();
  shouldLoadPerformance = output<TransferMarketPlayer>();

  private readonly dialog = inject(MatDialog);
  readonly cdnService = inject(ContentDeliveryService);
  readonly showHoursThreshold = 1.0;
  readonly showDaysThreshold = 48.0;
  showDetailedPoints = signal<boolean>(false);

  overpayment(): number {
    return (
      this.transferMarketPlayer().currentOffer.offer -
      this.transferMarketPlayer().marketValue
    );
  }

  showSellingDialog() {
    const dialogRef = this.dialog.open(TransferMarketBidDialog, {
      data: {
        playerName: this.transferMarketPlayer().name,
        marketValue: this.transferMarketPlayer().marketValue,
        currentBid:
          this.transferMarketPlayer().currentOffer.offer === 0
            ? this.transferMarketPlayer().marketValue
            : this.transferMarketPlayer().currentOffer.offer,
      },
    });
    dialogRef.afterClosed().subscribe((result: TransferMarketOutputBidData) => {
      switch (result.status) {
        case TransferMarketBidDialogStatus.CLEAR:
          this.transferMarketPlayer().currentOffer.offer = 0;
          // this.sold.emit();
          this.offerWithdrawn.emit(this.transferMarketPlayer());
          break;
        case TransferMarketBidDialogStatus.CANCEL:
          break;
        case TransferMarketBidDialogStatus.ACCEPT:
          this.transferMarketPlayer().currentOffer.offer = result.currentBid;
          this.offerPlaced.emit(this.transferMarketPlayer());
          break;
      }
    });
  }

  shouldShowMarketValueDiffToPrice(): boolean {
    return (
      !this.transferMarketPlayer().hasAnOffer() &&
      this.transferMarketPlayer().price >
        this.transferMarketPlayer().marketValue
    );
  }

  priceDifferenceToMarketValue(): number {
    return (
      this.transferMarketPlayer().price -
      this.transferMarketPlayer().marketValue
    );
  }

  togglePointDetails() {
    if (
      !this.showDetailedPoints() &&
      this.transferMarketPlayer().pointHistory.length == 0
    ) {
      this.shouldLoadPerformance.emit(this.transferMarketPlayer());
    }
    this.showDetailedPoints.set(!this.showDetailedPoints());
  }

  protected readonly PointIndication = PointIndication;
}

import { Component, inject, input, output, signal } from '@angular/core';
import { MatCard } from '@angular/material/card';
import {
  ExpirationTimePipe,
  MoneyPipe,
  TransferMarketPlayer,
} from '@kickbase/definitions';
import {
  MarketValueTrend,
  PointIndication,
  PointIndicatorView,
  PositionMarker,
} from '@kickbase/PositionMarker';
import { MatDialog } from '@angular/material/dialog';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import {
  TransferMarketBidDialog,
  TransferMarketBidDialogStatus,
  TransferMarketOutputBidData,
} from '../transfer-market-bid-dialog/TransferMarketBidDialog';
import { TransferMarketPlayerBottomSheet } from '../transfer-market-player-bottom-sheet/TransferMarketPlayerBottomSheet';
import { MatDivider } from '@angular/material/divider';
import { ContentDeliveryService } from '@kickbase/api-services';

@Component({
  selector: 'lib-transfer-market-card',
  imports: [
    MatCard,
    PositionMarker,
    ExpirationTimePipe,
    MarketValueTrend,
    MoneyPipe,
    MatDivider,
    PointIndicatorView,
    MatBottomSheetModule,
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
  private readonly bottomSheet = inject(MatBottomSheet);
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

  pricePerPoint(): number {
    const effectivePrice =
      this.transferMarketPlayer().currentOffer.offer > 0
        ? this.transferMarketPlayer().currentOffer.offer
        : this.transferMarketPlayer().price;
    return this.transferMarketPlayer().averagePoints > 0
      ? effectivePrice / this.transferMarketPlayer().averagePoints
      : 0;
  }

  playerImagePlaceholder(): string {
    return this.transferMarketPlayer().name.charAt(0).toUpperCase();
  }

  showSellingDialog() {
    const dialogRef = this.dialog.open(TransferMarketBidDialog, {
      width: '340px',
      maxWidth: '90vw',
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

  listMarketValueDifference(): number {
    return this.transferMarketPlayer().hasAnOffer()
      ? this.overpayment()
      : this.priceDifferenceToMarketValue();
  }

  showListMarketValueDifference(): boolean {
    const diff = this.listMarketValueDifference();
    return diff !== 0 || this.transferMarketPlayer().hasAnOffer();
  }

  togglePointDetails(event?: Event) {
    event?.stopPropagation();
    if (
      !this.showDetailedPoints() &&
      this.transferMarketPlayer().pointHistory.length == 0
    ) {
      this.shouldLoadPerformance.emit(this.transferMarketPlayer());
    }
    this.showDetailedPoints.set(!this.showDetailedPoints());
  }

  openPlayerDetails(): void {
    this.bottomSheet.open(TransferMarketPlayerBottomSheet, {
      data: { player: this.transferMarketPlayer() },
    });
  }

  protected readonly PointIndication = PointIndication;
}

import { Component, inject } from '@angular/core';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
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
import { MatDivider } from '@angular/material/divider';
import { ContentDeliveryService } from '@kickbase/api-services';

@Component({
  selector: 'lib-transfer-market-player-bottom-sheet',
  imports: [
    MatDivider,
    PositionMarker,
    MarketValueTrend,
    PointIndicatorView,
    MoneyPipe,
    ExpirationTimePipe,
  ],
  providers: [CurrencyPipe, DecimalPipe],
  templateUrl: './TransferMarketPlayerBottomSheet.html',
  styleUrls: ['./TransferMarketPlayerBottomSheet.scss'],
})
export class TransferMarketPlayerBottomSheet {
  protected readonly data = inject<{ player: TransferMarketPlayer }>(
    MAT_BOTTOM_SHEET_DATA,
  );
  private readonly bottomSheetRef = inject(
    MatBottomSheetRef<TransferMarketPlayerBottomSheet>,
  );
  readonly cdnService = inject(ContentDeliveryService);
  readonly PointIndication = PointIndication;
  readonly showHoursThreshold = 1.0;
  readonly showDaysThreshold = 48.0;

  protected get player(): TransferMarketPlayer {
    return this.data.player;
  }

  close(): void {
    this.bottomSheetRef.dismiss();
  }

  pricePerPoint(): number {
    const effectivePrice =
      this.player.currentOffer.offer > 0
        ? this.player.currentOffer.offer
        : this.player.price;
    return this.player.averagePoints > 0
      ? effectivePrice / this.player.averagePoints
      : 0;
  }

  playerImagePlaceholder(): string {
    return this.player.name.charAt(0).toUpperCase();
  }

  effectiveBidOrPrice(): number {
    return this.player.currentOffer.offer > 0
      ? this.player.currentOffer.offer
      : this.player.price;
  }
}

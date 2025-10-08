import { Component, inject, input, output } from '@angular/core';
import { MatCard } from '@angular/material/card';
import {
  ExpirationTimePipe,
  MoneyPipe,
  TransferMarketPlayer,
} from '@kickbase/definitions';
import { PlayerNameAndValue, PositionMarker } from '@kickbase/PositionMarker';
import { MatDialog } from '@angular/material/dialog';
import {
  TransferMarketBidDialog,
  TransferMarketBidDialogStatus,
  TransferMarketOutputBidData,
} from '../transfer-market-bid-dialog/TransferMarketBidDialog';

@Component({
  selector: 'lib-transfer-market-card',
  imports: [
    MatCard,
    PositionMarker,
    ExpirationTimePipe,
    PlayerNameAndValue,
    MoneyPipe,
  ],
  templateUrl: './TransferMarketCard.html',
  styleUrls: ['./TransferMarketCard.scss', '../shared.scss'],
})
export class TransferMarketCard {
  transferMarketPlayer = input.required<TransferMarketPlayer>();
  sold = output();

  private readonly dialog = inject(MatDialog);
  readonly showHoursThreshold = 1.0;
  readonly showDaysThreshold = 48.0;

  overpayment(): number {
    return (
      this.transferMarketPlayer().currentBid -
      this.transferMarketPlayer().marketValue
    );
  }

  showSellingDialog() {
    const dialogRef = this.dialog.open(TransferMarketBidDialog, {
      data: {
        playerName: this.transferMarketPlayer().name,
        marketValue: this.transferMarketPlayer().marketValue,
        currentBid:
          this.transferMarketPlayer().currentBid === 0
            ? this.transferMarketPlayer().marketValue
            : this.transferMarketPlayer().currentBid,
      },
    });
    dialogRef.afterClosed().subscribe((result: TransferMarketOutputBidData) => {
      switch (result.status) {
        case TransferMarketBidDialogStatus.CLEAR:
          this.transferMarketPlayer().currentBid = 0;
          this.sold.emit();
          break;
        case TransferMarketBidDialogStatus.CANCEL:
          break;
        case TransferMarketBidDialogStatus.ACCEPT:
          this.transferMarketPlayer().currentBid = result.currentBid;
          this.sold.emit();
          break;
      }
    });
  }
}

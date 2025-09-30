import { Component, inject, OnInit, signal } from '@angular/core';
import {
  ExpirationTimePipe,
  KickbaseLeagueConstants,
  kickbasePositionToString,
  KickbaseStaffPosition,
  MoneyPipe,
  TransferMarketPlayer,
} from '@kickbase/definitions';
import { TransferMarketService } from '../service/transfer-market-service';
import { DecimalPipe, NgClass } from '@angular/common';

@Component({
  selector: 'lib-transfer-market',
  imports: [MoneyPipe, ExpirationTimePipe, NgClass],
  providers: [DecimalPipe],
  templateUrl: './transfer-market.html',
  styleUrls: ['./transfer-market.scss', '../shared.scss'],
})
export class TransferMarket implements OnInit {
  transferMarket = signal<TransferMarketPlayer[]>([]);

  private readonly transferMarketService = inject(TransferMarketService);

  ngOnInit(): void {
    this.transferMarketService
      .fetchTransferMarketInformation(
        KickbaseLeagueConstants.STROHGAEU_BUBEN_LEAGUE_ID
      )
      .subscribe({
        next: (data) => {
          const transferData = data.it.map(
            (data) => new TransferMarketPlayer(data)
          );
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

  positionCssClassName(position: KickbaseStaffPosition): string {
    return 'position__' + kickbasePositionToString(position);
  }

  protected readonly kickbasePositionToString = kickbasePositionToString;
}

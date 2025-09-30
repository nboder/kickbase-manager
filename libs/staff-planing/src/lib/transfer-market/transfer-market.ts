import { Component, inject, OnInit, signal } from '@angular/core';
import {
  KickbaseLeagueConstants,
  TransferMarketPlayer,
} from '@kickbase/definitions';
import { TransferMarketService } from '../service/transfer-market-service';

@Component({
  selector: 'lib-transfer-market',
  imports: [],
  templateUrl: './transfer-market.html',
  styleUrl: './transfer-market.scss',
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
          this.transferMarket.set(
            data.it.map((data) => new TransferMarketPlayer(data))
          );
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
}

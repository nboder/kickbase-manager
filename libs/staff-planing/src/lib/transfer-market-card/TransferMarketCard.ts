import { Component, input } from '@angular/core';
import { MatCard } from '@angular/material/card';
import {
  ExpirationTimePipe,
  MoneyPipe,
  TransferMarketPlayer,
} from '@kickbase/definitions';
import { PlayerNameAndValue, PositionMarker } from '@kickbase/PositionMarker';

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

  readonly showHoursThreshold = 1.0;
  readonly showDaysThreshold = 48.0;
}

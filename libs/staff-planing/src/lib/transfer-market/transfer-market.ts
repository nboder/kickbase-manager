import {
  Component,
  computed,
  ElementRef,
  inject,
  OnInit,
  output,
  QueryList,
  signal,
  ViewChildren,
} from '@angular/core';
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
  providers: [DecimalPipe, MoneyPipe],
  templateUrl: './transfer-market.html',
  styleUrls: ['./transfer-market.scss', '../shared.scss'],
})
export class TransferMarket implements OnInit {
  sumOfBuyingPlayers = output<number>();

  transferMarket = signal<TransferMarketPlayer[]>([]);
  readonly showHoursThreshold = 1.0;
  readonly showDaysThreshold = 48.0;

  @ViewChildren('overpayment')
  private readonly overPayments: QueryList<ElementRef> | undefined;
  private readonly transfermarketLookup = new Map<string, TransferMarketPlayer>(
    []
  );

  private readonly transferMarketService = inject(TransferMarketService);
  private readonly moneyPipe = inject(MoneyPipe);
  private readonly playersMarkedForBuying = new Set<string>([]);

  ngOnInit(): void {
    this.transferMarketService
      .fetchTransferMarketInformation(
        KickbaseLeagueConstants.STROHGAEU_BUBEN_LEAGUE_ID
      )
      .subscribe({
        next: (data) => {
          const transferData = data.it.map((data) => {
            const transferPlayer = new TransferMarketPlayer(data);
            this.transfermarketLookup.set(
              transferPlayer.playerId,
              transferPlayer
            );
            return transferPlayer;
          });
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

  togglePlayerForBuying(transferredPlayer: TransferMarketPlayer, event: Event) {
    const element = event.target as HTMLInputElement;
    if (element.checked) {
      this.playersMarkedForBuying.add(transferredPlayer.playerId);
    } else {
      this.playersMarkedForBuying.delete(transferredPlayer.playerId);
    }
    const input = this.findInputElementForPlayer(transferredPlayer.playerId);
    if (input) {
      input.nativeElement.value = element.checked
        ? transferredPlayer.marketValue
        : '';
    }
  }

  isNotPlayerMarkedForBuying(player: TransferMarketPlayer): boolean {
    return !this.playersMarkedForBuying.has(player.playerId);
  }

  positionCssClassName(position: KickbaseStaffPosition): string {
    return 'position__' + kickbasePositionToString(position);
  }

  protected readonly kickbasePositionToString = kickbasePositionToString;

  acceptBuyingOrders() {
    let resultValueOfBuyingPlayers = 0;
    this.playersMarkedForBuying.forEach((playerId) => {
      const paymentForPlayer = this.findInputElementForPlayer(playerId);
      if (paymentForPlayer) {
        resultValueOfBuyingPlayers += parseInt(
          paymentForPlayer.nativeElement.value
        );
      }
    });
    this.sumOfBuyingPlayers.emit(resultValueOfBuyingPlayers);
  }

  private findInputElementForPlayer(playerId: string): ElementRef | undefined {
    if (this.overPayments) {
      return this.overPayments.find((overpayment) => {
        return overpayment.nativeElement.id === playerId;
      });
    } else {
      return undefined;
    }
  }
}

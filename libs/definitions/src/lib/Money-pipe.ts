import { inject, Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'moneyPipe',
})
export class MoneyPipe implements PipeTransform {
  private currencyPipe = inject(CurrencyPipe);

  transform(value: number | string, ...args: unknown[]): unknown {
    return this.currencyPipe.transform(value, 'EUR', 'symbol', '1.0-0');
  }
}

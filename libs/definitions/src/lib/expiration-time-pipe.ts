import { inject, Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({
  name: 'expirationTime',
})
export class ExpirationTimePipe implements PipeTransform {
  private readonly decimalPipe = inject(DecimalPipe);

  transform(value: number | string, ...args: unknown[]): unknown {
    return this.decimalPipe.transform(value, '1.0-0');
  }
}

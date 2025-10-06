import { Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'lib-selling-indicator',
  imports: [NgOptimizedImage],
  templateUrl: './SellingIndicator.html',
  styleUrl: './SellingIndicator.scss',
})
export class SellingIndicator {
  showSelling = input.required<boolean>();
  size = input<number>(20);
}

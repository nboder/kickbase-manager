import { Component, input } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { NgClass } from '@angular/common';

@Component({
  selector: 'lib-divider',
  imports: [MatDivider, NgClass],
  templateUrl: './Divider.html',
  styleUrl: './Divider.scss',
})
export class Divider {
  text = input<string>();
  size = input<DividerSize>(DividerSize.MEDIUM);
  protected readonly DividerSize = DividerSize;
}

export enum DividerSize {
  SMALL,
  MEDIUM,
  LARGE,
}

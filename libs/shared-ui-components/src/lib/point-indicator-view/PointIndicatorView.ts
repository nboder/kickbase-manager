import { Component, input } from '@angular/core';
import { PointIndication } from './point-indication';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'lib-point-indicator-view',
  imports: [NgOptimizedImage],
  templateUrl: './PointIndicatorView.html',
  styleUrl: './PointIndicatorView.scss',
})
export class PointIndicatorView {
  pointIndication = input.required<PointIndication>();
  countOfIndications = input.required<number>();
  protected readonly PointIndication = PointIndication;
}

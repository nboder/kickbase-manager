import { Component, input } from '@angular/core';
import { PointIndication } from './point-indication';

@Component({
  selector: 'lib-bar-indicator-view',
  imports: [],
  templateUrl: './PointIndicatorView.html',
  styleUrl: './PointIndicatorView.scss',
})
export class PointIndicatorView {
  pointIndication = input.required<PointIndication>();
  protected readonly PointIndication = PointIndication;
}

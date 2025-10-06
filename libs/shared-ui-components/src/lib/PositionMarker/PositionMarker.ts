import { Component, input } from '@angular/core';
import { MatChip } from '@angular/material/chips';
import {
  kickbasePositionToString,
  KickbaseStaffPosition,
} from '@kickbase/definitions';

@Component({
  selector: 'lib-position-marker',
  imports: [MatChip],
  templateUrl: './PositionMarker.html',
  styleUrl: './PositionMarker.scss',
})
export class PositionMarker {
  position = input.required<KickbaseStaffPosition>();

  cssClassForPosition(position: KickbaseStaffPosition): string {
    return 'position__' + kickbasePositionToString(position);
  }

  protected readonly kickbasePositionToString = kickbasePositionToString;
}

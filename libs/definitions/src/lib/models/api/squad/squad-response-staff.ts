import { SquadResponsePlayer } from './squad-response-player';

export interface SquadResponseStaff {
  readonly it: [SquadResponsePlayer];
  readonly mppu: number;
}

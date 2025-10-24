import { ManagerSquadPlayerResponse } from './manager-squad-player-response';

export interface ManagerSquadResponse {
  readonly u: string;
  readonly unm: string;
  readonly it: ManagerSquadPlayerResponse[];
}

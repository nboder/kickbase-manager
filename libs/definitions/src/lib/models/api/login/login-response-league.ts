import { LoginResponseLeagueManager } from './login-response-league-manager';

export interface LoginResponseLeague {
  readonly id: string;
  readonly name: string;
  readonly cpi: string;
  readonly lm: LoginResponseLeagueManager;
}

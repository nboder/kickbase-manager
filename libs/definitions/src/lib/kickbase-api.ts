export class KickbaseApi {
  private static readonly KICKBASE_API_URL = 'https://api.kickbase.com/v4';
  private static readonly PATH_DELIMITER = '/';
  private static readonly USER_PATH = 'user';
  private static readonly LOGIN_PATH = 'login';
  private static readonly LEAGUES_PATH = 'leagues';
  private static readonly SQUAD_PATH = 'squad';
  private static readonly PLAYERS_PATH = 'players';
  private static readonly MARKET_PATH = 'market';

  static loginUrl(): string {
    return this.buildApiUrl([this.USER_PATH, this.LOGIN_PATH]);
  }

  static mySquadUrl(leagueId: string): string {
    return this.buildApiUrl([this.LEAGUES_PATH, leagueId, this.SQUAD_PATH]);
  }

  static marketUrl(leagueId: string): string {
    return this.buildApiUrl([this.LEAGUES_PATH, leagueId, this.MARKET_PATH]);
  }

  static playerInformationUrl(leagueId: string, playerId: string): string {
    return this.buildApiUrl([
      this.LEAGUES_PATH,
      leagueId,
      this.PLAYERS_PATH,
      playerId,
    ]);
  }

  private static buildApiUrl(paths: string[]): string {
    let api = this.KICKBASE_API_URL;
    for (const path of paths) {
      api += this.prefixWithDelimiter(path);
    }
    return api;
  }

  private static prefixWithDelimiter(path: string): string {
    return this.PATH_DELIMITER + path;
  }
}

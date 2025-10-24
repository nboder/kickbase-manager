export class KickbaseApi {
  private static readonly KICKBASE_API_URL = 'https://api.kickbase.com/v4';
  private static readonly PATH_DELIMITER = '/';
  private static readonly USER_PATH = 'user';
  private static readonly LOGIN_PATH = 'login';
  private static readonly LEAGUES_PATH = 'leagues';
  private static readonly SQUAD_PATH = 'squad';
  private static readonly PLAYERS_PATH = 'players';
  private static readonly MARKET_PATH = 'market';
  private static readonly MANAGERS_PATH = 'managers';
  private static readonly DASHBOARD_PATH = 'dashboard';
  private static readonly PERFORMANCE_PATH = 'performance';
  private static readonly OVERVIEW_PATH = 'overview';
  private static readonly ME_PATH = 'me';
  private static readonly BUDGET_PATH = 'budget';
  private static readonly OFFERS_PATH = 'offers';

  static readonly INCLUDE_MANAGERS_AND_BATTLES_QUERY_PARAM =
    'includeManagersAndBattles';

  static readonly CURRENT_SEASON_PERFORMANCE_NAME = '2025/2026';

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

  static playerPerformanceUrl(leagueId: string, playerId: string): string {
    return this.buildApiUrl([
      this.LEAGUES_PATH,
      leagueId,
      this.PLAYERS_PATH,
      playerId,
      this.PERFORMANCE_PATH,
    ]);
  }

  static placeOfferUrl(leagueId: string, playerId: string): string {
    return this.buildApiUrl([
      this.LEAGUES_PATH,
      leagueId,
      this.MARKET_PATH,
      playerId,
      this.OFFERS_PATH,
    ]);
  }

  static withDrawOfferUrl(
    leagueId: string,
    playerId: string,
    offerId: string
  ): string {
    return this.buildApiUrl([
      this.LEAGUES_PATH,
      leagueId,
      this.MARKET_PATH,
      playerId,
      this.OFFERS_PATH,
      offerId,
    ]);
  }

  static managerDashboardUrl(leagueId: string, managerId: string): string {
    return this.buildApiUrl([
      this.LEAGUES_PATH,
      leagueId,
      this.MANAGERS_PATH,
      managerId,
      this.DASHBOARD_PATH,
    ]);
  }

  static managerBudgetUrl(managerId: string): string {
    return this.buildApiUrl([
      this.LEAGUES_PATH,
      managerId,
      this.ME_PATH,
      this.BUDGET_PATH,
    ]);
  }

  static leagueOverviewUrl(leagueId: string): string {
    return this.buildApiUrl([this.LEAGUES_PATH, leagueId, this.OVERVIEW_PATH]);
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

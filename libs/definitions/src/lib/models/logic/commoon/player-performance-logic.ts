export class PlayerPerformanceLogic {
  private static readonly GREAT_GAME_MIN_POINTS = 400;
  private static readonly VERY_GOOD_GAME_MIN_POINTS = 200;
  private static readonly GOOD_GAME_MIN_POINTS = 100;

  static isGreatGame(points: number | undefined): boolean {
    if (points === undefined) {
      return false;
    }
    return points >= PlayerPerformanceLogic.GREAT_GAME_MIN_POINTS;
  }

  static isVeryGoodGame(points: number | undefined): boolean {
    if (points === undefined) {
      return false;
    }
    return (
      points < PlayerPerformanceLogic.GREAT_GAME_MIN_POINTS &&
      points >= PlayerPerformanceLogic.VERY_GOOD_GAME_MIN_POINTS
    );
  }

  static isGoodGame(points: number | undefined): boolean {
    if (points === undefined) {
      return false;
    }
    return (
      points < PlayerPerformanceLogic.VERY_GOOD_GAME_MIN_POINTS &&
      points >= PlayerPerformanceLogic.GOOD_GAME_MIN_POINTS
    );
  }

  static isBadGame(points: number | undefined): boolean {
    if (points === undefined) {
      return false;
    }
    return points < PlayerPerformanceLogic.GOOD_GAME_MIN_POINTS;
  }

  static notPlayedGames(points: number | undefined): boolean {
    return points === undefined;
  }
}

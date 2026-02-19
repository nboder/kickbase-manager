export class CompetitionTableEntry {
  readonly teamId: string;
  readonly teamName: string;
  readonly playedGames: number;
  readonly points: number;
  readonly tablePosition: number;

  constructor(
    teamId: string,
    teamName: string,
    playedGames: number,
    points: number,
    tablePosition: number,
  ) {
    this.teamId = teamId;
    this.teamName = teamName;
    this.playedGames = playedGames;
    this.points = points;
    this.tablePosition = tablePosition;
  }
}

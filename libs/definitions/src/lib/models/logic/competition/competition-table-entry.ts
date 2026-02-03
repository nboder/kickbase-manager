export class CompetitionTableEntry {
  readonly teamName: string;
  readonly playedGames: number;
  readonly points: number;
  readonly tablePosition: number;

  constructor(
    teamName: string,
    playedGames: number,
    points: number,
    tablePosition: number
  ) {
    this.teamName = teamName;
    this.playedGames = playedGames;
    this.points = points;
    this.tablePosition = tablePosition;
  }
}

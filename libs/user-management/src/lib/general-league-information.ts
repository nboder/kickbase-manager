export class GeneralLeagueInformation {
  readonly budget: number;
  readonly teamValue: number;
  readonly placement: number;
  readonly points: number;

  constructor(
    budget: number,
    teamValue: number,
    placement: number,
    points: number
  ) {
    this.budget = budget;
    this.teamValue = teamValue;
    this.placement = placement;
    this.points = points;
  }

  static noLeagueInformation(): GeneralLeagueInformation {
    return new GeneralLeagueInformation(0, 0, 0, 0);
  }
}

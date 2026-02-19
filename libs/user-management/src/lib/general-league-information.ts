export class GeneralLeagueInformation {
  readonly id: string;
  readonly name: string;
  readonly competitionId: string;
  readonly budget: number;
  readonly teamValue: number;
  readonly placement: number;
  readonly points: number;

  constructor(
    id: string,
    name: string,
    competitionId: string,
    budget: number,
    teamValue: number,
    placement: number,
    points: number,
  ) {
    this.id = id;
    this.name = name;
    this.competitionId = competitionId;
    this.budget = budget;
    this.teamValue = teamValue;
    this.placement = placement;
    this.points = points;
  }

  static noLeagueInformation(): GeneralLeagueInformation {
    return new GeneralLeagueInformation('', '', '0', 0, 0, 0, 0);
  }
}

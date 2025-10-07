export interface MarketInformationPlayerResponse {
  readonly i: string;
  readonly fn: string;
  readonly n: string;
  readonly tid: string;
  readonly pos: number;
  readonly st: number;
  readonly mvt: number;
  readonly mv: number;
  readonly p: number;
  readonly ap: number;
  readonly ofc: number;
  readonly exs: number;
  readonly prc: number;
  readonly isn: boolean;
  readonly iposl: boolean;
  readonly dt: string; // DateTime
  readonly pim: string; // Player Image
  readonly prob: number;
}

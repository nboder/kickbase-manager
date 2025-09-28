export interface StaffResponsePlayer {
  readonly mvgl: number // Market Value since buy
  readonly i: string // ID
  readonly n: string // Name
  readonly pos: number
  readonly mv: number // Market Value
  readonly sdmvt: number, // 7 Day Prediction
  readonly tfhmvt: number, // 24h Preisentwicklung
}

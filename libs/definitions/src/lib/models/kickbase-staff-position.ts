export enum KickbaseStaffPosition {
  GK = 1,
  DEF = 2,
  MID = 3,
  FWD = 4,
}

export function kickbasePositionFromValue(pos: number): KickbaseStaffPosition {
  switch (pos) {
    case 1:
      return KickbaseStaffPosition.GK;
    case 2:
      return KickbaseStaffPosition.DEF;
    case 3:
      return KickbaseStaffPosition.MID;
    case 4:
      return KickbaseStaffPosition.FWD;
    default:
      throw new Error(`Unknown position value: ${pos}`);
  }
}

export function kickbasePositionToString(pos: number): string {
  switch (pos) {
    case KickbaseStaffPosition.GK:
      return 'GK';
    case KickbaseStaffPosition.DEF:
      return 'DEF';
    case KickbaseStaffPosition.MID:
      return 'MF';
    case KickbaseStaffPosition.FWD:
      return 'FW';
    default:
      return 'Unknown';
  }
}

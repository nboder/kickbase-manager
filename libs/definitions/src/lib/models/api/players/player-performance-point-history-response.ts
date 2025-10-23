export interface PlayerPerformancePointHistoryResponse {
  readonly day: number;
  readonly p: number | undefined;
  readonly mp: number | undefined;
  readonly cur: boolean;
}

// "day": 1,
//   "p": 120,
//   "mp": "97'",
//   "md": "2025-08-23T13:30:00Z",
//   "t1": "4",
//   "t2": "10",
//   "t1g": 4,
//   "t2g": 1,
//   "pt": "4",
//   "st": 5,
//   "cur": false,
//   "mdst": 2,
//   "ap": 113,
//   "tp": 338,
//   "asp": 6016,
//   "t1im": "content/file/422de82bee3b47eb898699d6d27095ba.svg",
//   "t2im": "content/file/a7e609e72fb04c6d8c96e8ed82f0315d.svg"

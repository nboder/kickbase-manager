export class CurrentUser {
  readonly username: string;
  readonly id: string;
  readonly token: string;
  readonly tokenExpiry: Date;

  constructor(username: string, id: string, token: string, expiry: string) {
    this.username = username;
    this.id = id;
    this.token = token;
    this.tokenExpiry = new Date(expiry);
  }

  static noUser(): CurrentUser {
    return new CurrentUser('', '', '', '');
  }
}

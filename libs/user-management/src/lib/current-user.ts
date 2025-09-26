export class CurrentUser {
  readonly username: string;
  readonly id: string;
  readonly token: string;

  constructor(username: string, id: string, token: string) {
    this.username = username;
    this.id = id;
    this.token = token;
  }

  static noUser(): CurrentUser {
    return new CurrentUser('', '', '');
  }
}

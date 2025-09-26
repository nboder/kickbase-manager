export class CurrentUser {
  private readonly username: string;
  private readonly id: string;
  private readonly token: string;

  constructor(username: string, id: string, token: string) {
    this.username = username;
    this.id = id;
    this.token = token;
  }

  static noUser(): CurrentUser {
    return new CurrentUser('', '', '');
  }
}

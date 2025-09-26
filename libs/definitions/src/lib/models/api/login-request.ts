export class LoginRequest {
  private readonly rep = {}
  private readonly loy = false
  private readonly ext = true
  private readonly em: string
  private readonly pass: string

  constructor(username: string, password: string) {
    this.em = username;
    this.pass = password;
  }
}

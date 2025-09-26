import { LoginResponseUser } from './login-response-user';
import { LoginResponseLeague } from './login-response-league';

export interface LoginResponse {
  readonly u: LoginResponseUser
  readonly srvl: LoginResponseLeague
  readonly tkn: string
}

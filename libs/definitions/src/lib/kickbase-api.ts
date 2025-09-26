export class KickbaseApi {
  private static readonly KICKBASE_API_URL = 'https://api.kickbase.com/v4';
  private static readonly PATH_DELIMITER = '/';
  private static readonly USER_PATH = 'user';
  private static readonly LOGIN_PATH = 'login';

  static loginUrl(): string {
    return this.buildApiUrl([this.USER_PATH, this.LOGIN_PATH]);
  }

  private static buildApiUrl(paths: string[]): string {
    let api = this.KICKBASE_API_URL;
    for (const path of paths) {
      api += this.prefixWithDelimiter(path);
    }
    return api;
  }

  private static prefixWithDelimiter(path: string): string {
    return this.PATH_DELIMITER + path;
  }
}

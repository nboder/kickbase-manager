import { KickbaseApi } from './kickbase-api';
describe('KickbaseApi', () => {
  it('should create an instance', () => {
    expect(new KickbaseApi()).toBeTruthy();
  });
  it('loginUrl should return proper url', () => {
    expect(KickbaseApi.loginUrl()).toEqual(
      'https://api.kickbase.com/v4/user/login'
    );
  });
});

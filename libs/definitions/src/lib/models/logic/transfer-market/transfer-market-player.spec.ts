import { TransferMarketPlayer } from './transfer-market-player';
import { MarketInformationPlayerResponse } from '../../api/transfer-market/market-information-player-response';

describe('TransferMarketPlayer', () => {
  const baseResponse: MarketInformationPlayerResponse = {
    i: '1',
    fn: 'Max',
    n: 'Mustermann',
    tid: 't1',
    pos: 1,
    st: 1,
    mvt: 1000,
    mv: 1000000,
    p: 10,
    ap: 5,
    ofc: 0,
    uop: 0,
    uoid: '',
    exs: 86400,
    prc: 1200000,
    isn: false,
    iposl: false,
    dt: '',
    pim: '',
    prob: 0,
  };

  it('should compute expiration methods from seconds', () => {
    const player = new TransferMarketPlayer(baseResponse);

    expect(player.transferExpiringSeconds).toBe(86400);
    expect(player.hasTransferExpiration()).toBe(true);
    expect(player.transferExpirationInMinutes()).toBe(1440);
    expect(player.transferExpirationInHours()).toBe(24);
    expect(player.transferExpirationInDays()).toBe(1);
  });

  it('should support players without a transfer expiration', () => {
    const responseWithoutExpiration = { ...baseResponse, exs: undefined };
    const player = new TransferMarketPlayer(responseWithoutExpiration);

    expect(player.transferExpiringSeconds).toBeUndefined();
    expect(player.hasTransferExpiration()).toBe(false);
    expect(player.transferExpirationInMinutes()).toBe(0);
  });
});

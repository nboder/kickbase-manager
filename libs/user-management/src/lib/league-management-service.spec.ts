import { LeagueManagementService } from './league-management-service';
import { GeneralLeagueInformation } from './general-league-information';

describe('LeagueManagementService', () => {
  let service: LeagueManagementService;
  let storage: Storage;

  beforeEach(() => {
    const store: Record<string, string> = {};
    storage = {
      getItem: (key: string) => store[key] ?? null,
      setItem: (key: string, value: string) => {
        store[key] = value;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        Object.keys(store).forEach((key) => delete store[key]);
      },
      key: () => null,
      length: 0,
    } as Storage;

    service = new LeagueManagementService();
    Object.defineProperty(globalThis, 'localStorage', {
      value: storage,
      writable: true,
    });
  });

  it('should persist and retrieve selected league information', () => {
    const league = new GeneralLeagueInformation(
      'league-1',
      'Test League',
      1000000,
      2000000,
      1,
      42
    );

    service.setLeagueInformation(league);
    const stored = service.getLeagueInformation();

    expect(stored.id).toBe('league-1');
    expect(stored.name).toBe('Test League');
    expect(stored.budget).toBe(1000000);
    expect(stored.placement).toBe(1);
    expect(stored.points).toBe(42);
  });

  it('should return no league information when nothing is stored', () => {
    const stored = service.getLeagueInformation();
    expect(stored.id).toBe('');
  });
});

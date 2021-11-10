import { renderHook, act } from '@testing-library/react-hooks';
import useYtelseSammendrag from './useYtelseSammendrag';
import { AppStoreProvider } from '../data/store/AppStore';
import ytelser from '../mockdata/mockYtelser';
import FetchMock, { SpyMiddleware } from 'yet-another-fetch-mock';

describe('useYtelseSammendrag', () => {
  it('skal returnere arbeidsgivere', async () => {
    const expected = [
      {
        identitetsnummer: 1234,
        navn: 'Knut Knutsen',
        antall_refusjoner: 1,
        merknad: undefined,
        max_refusjon_dager: 365,
        refusjonsbeløp: 444
      },
      {
        identitetsnummer: 234555,
        navn: 'Ole Olsen',
        antall_refusjoner: 1,
        merknad: undefined,
        max_refusjon_dager: 365,
        refusjonsbeløp: 323
      },
      {
        identitetsnummer: 4444444,
        navn: 'Pål Pålsen',
        antall_refusjoner: 2,
        merknad: undefined,
        max_refusjon_dager: 365,
        refusjonsbeløp: 246
      }
    ];

    let mock: FetchMock;
    let spy: SpyMiddleware;

    spy = new SpyMiddleware();

    mock = FetchMock.configure({
      middleware: spy.middleware
    });

    expect(spy.size()).toBe(0);

    mock.get(
      'https://helse-spion.dev.nav.no/api/v1/ytelsesperioder/virksomhet/:arbeidsgiverid',
      (req, res, ctx) => res(ctx.json(ytelser), ctx.status(200))
    );

    const { result } = renderHook(() => useYtelseSammendrag(), {
      wrapper: AppStoreProvider
    });

    let getResult: any;
    const getYtelseSammendrag = result.current;
    await act(async () => {
      getResult = await getYtelseSammendrag(
        '123456789',
        '2020.01.01',
        '2020.02.02'
      );
    });
    expect(spy.size()).toBe(1);
    expect(spy.lastCall()).not.toBeNull();
    expect(spy.lastUrl()).toBe(
      'https://helse-spion.dev.nav.no/api/v1/ytelsesperioder/virksomhet/123456789?fom=2020.01.01&tom=2020.02.02'
    );
    expect(getResult).toEqual(expected);
  });

  it('skal håndtere feil', async () => {
    let mock: FetchMock;
    let spy: SpyMiddleware;

    const mockError = {
      type: 'NoeGalt',
      title: 'Noe gikk galt'
    };

    const mockExpected = {
      type: 'NOEGALT',
      title: 'Noe gikk galt'
    };
    spy = new SpyMiddleware();

    mock = FetchMock.configure({
      middleware: spy.middleware
    });

    expect(spy.size()).toBe(0);

    mock.get(
      'https://helse-spion.dev.nav.no/api/v1/ytelsesperioder/virksomhet/:arbeidsgiverid',
      (req, res, ctx) => res(ctx.json(mockError), ctx.status(500))
    );

    const { result } = renderHook(() => useYtelseSammendrag(), {
      wrapper: AppStoreProvider
    });

    let gotError: any;

    const getYtelsesSammendrag = result.current;
    await act(async () => {
      gotError = await getYtelsesSammendrag(
        '123456789',
        '2020.01.01',
        '2020.02.02'
      );
    });
    expect(spy.size()).toBe(1);
    expect(spy.lastCall()).not.toBeNull();
    expect(spy.lastUrl()).toBe(
      'https://helse-spion.dev.nav.no/api/v1/ytelsesperioder/virksomhet/123456789?fom=2020.01.01&tom=2020.02.02'
    );
    expect(gotError).toEqual(mockExpected);
  });
});

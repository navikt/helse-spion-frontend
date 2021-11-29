import { renderHook, act } from '@testing-library/react-hooks';
import useYtelsesperioder from './useYtelsesperioder';
import { AppStoreProvider } from './store/AppStore';
import ytelser from '../mockdata/mockYtelser';
import FetchMock, { SpyMiddleware } from 'yet-another-fetch-mock';
import timezone_mock from 'timezone-mock';

timezone_mock.register('Europe/London');

const expectedStuff = [
  {
    arbeidsforhold: {
      arbeidstaker: {
        etternavn: 'Knutsen',
        fornavn: 'Knut',
        identitetsnummer: 1234
      }
    },
    periode: {
      fom: new Date('2019-01-01T00:00:00.000Z'),
      tom: new Date('2020-01-01T00:00:00.000Z')
    },
    refusjonsbeløp: 444
  },
  {
    arbeidsforhold: {
      arbeidstaker: {
        etternavn: 'Olsen',
        fornavn: 'Ole',
        identitetsnummer: 234555
      }
    },
    periode: {
      fom: new Date('2019-01-01T00:00:00.000Z'),
      tom: new Date('2020-01-01T00:00:00.000Z')
    },
    refusjonsbeløp: 323
  },
  {
    arbeidsforhold: {
      arbeidstaker: {
        etternavn: 'Pålsen',
        fornavn: 'Pål',
        identitetsnummer: 4444444
      }
    },
    periode: {
      fom: new Date('2019-01-01T00:00:00.000Z'),
      tom: new Date('2020-01-01T00:00:00.000Z')
    },
    refusjonsbeløp: 123
  },
  {
    arbeidsforhold: {
      arbeidstaker: {
        etternavn: 'Pålsen',
        fornavn: 'Pål',
        identitetsnummer: 4444444
      }
    },
    periode: {
      fom: new Date('2020-02-02T00:00:00.000Z'),
      tom: new Date('2020-03-03T00:00:00.000Z')
    },
    refusjonsbeløp: 123
  }
];

describe('useYtelsesperioder', () => {
  it('skal returnere arbeidsgivere', async () => {
    let mock: FetchMock;
    let spy: SpyMiddleware;

    spy = new SpyMiddleware();

    mock = FetchMock.configure({
      middleware: spy.middleware
    });

    expect(spy.size()).toBe(0);

    mock.post(
      'https://helse-spion.dev.nav.no/api/v1/ytelsesperioder/oppslag',
      (req, res, ctx) => res(ctx.json(ytelser), ctx.status(200))
    );

    const { result } = renderHook(() => useYtelsesperioder(), {
      wrapper: AppStoreProvider
    });

    const getYtelseSammendrag = result.current;
    await act(async () => {
      const getResult = await getYtelseSammendrag(
        '123456789',
        '2020.01.01',
        '2020.02.02'
      );

      expect(getResult).toEqual(expectedStuff);
      expect(spy.size()).toBe(1);
      expect(spy.lastCall()).not.toBeNull();
      expect(spy.lastUrl()).toBe(
        'https://helse-spion.dev.nav.no/api/v1/ytelsesperioder/oppslag'
      );
    });
  });

  it('skal returnere arbeidsgivere uten fom og tom', async () => {
    let mock: FetchMock;
    let spy: SpyMiddleware;

    spy = new SpyMiddleware();

    mock = FetchMock.configure({
      middleware: spy.middleware
    });

    expect(spy.size()).toBe(0);

    mock.post(
      'https://helse-spion.dev.nav.no/api/v1/ytelsesperioder/oppslag',
      (req, res, ctx) => res(ctx.json(ytelser), ctx.status(200))
    );

    const { result } = renderHook(() => useYtelsesperioder(), {
      wrapper: AppStoreProvider
    });

    const getYtelseSammendrag = result.current;
    await act(async () => {
      const getResult = await getYtelseSammendrag('12345678901', '123456789');

      expect(getResult).toEqual(expectedStuff);
    });

    const lastOptions = spy.lastOptions();
    const optionsBody = JSON.parse(lastOptions?.body as unknown as string);
    const expectedOptions = {
      identitetsnummer: '12345678901',
      arbeidsgiverId: '123456789'
    };

    expect(spy.lastUrl()).toBe(
      'https://helse-spion.dev.nav.no/api/v1/ytelsesperioder/oppslag'
    );
    expect(optionsBody).toEqual(expectedOptions);
  });

  it('skal håndtere feil', async () => {
    const expectedError = { title: 'Noe gikk galt', type: 'NOEGALT' };
    let mock: FetchMock;
    let spy: SpyMiddleware;
    const mockError = {
      type: 'NoeGalt',
      title: 'Noe gikk galt'
    };

    spy = new SpyMiddleware();

    mock = FetchMock.configure({
      middleware: spy.middleware
    });

    expect(spy.size()).toBe(0);

    mock.post(
      'https://helse-spion.dev.nav.no/api/v1/ytelsesperioder/oppslag',
      (req, res, ctx) => res(ctx.json(mockError), ctx.status(500))
    );

    const { result } = renderHook(() => useYtelsesperioder(), {
      wrapper: AppStoreProvider
    });

    const getYtelsesperioder = result.current;

    let gotError: any;

    await act(async () => {
      gotError = await getYtelsesperioder(
        '12345678901',
        '123456789',
        '2020.01.01',
        '2020.02.02'
      );
    });

    const lastOptions = spy.lastOptions();
    const optionsBody = JSON.parse(lastOptions?.body as unknown as string);
    const expectedOptions = {
      identitetsnummer: '12345678901',
      arbeidsgiverId: '123456789',
      periode: { fom: '2020.01.01', tom: '2020.02.02' }
    };

    expect(spy.size()).toBe(1);
    expect(spy.lastCall()).not.toBeNull();
    expect(spy.lastUrl()).toBe(
      'https://helse-spion.dev.nav.no/api/v1/ytelsesperioder/oppslag'
    );
    expect(optionsBody).toEqual(expectedOptions);
    expect(gotError).toEqual(expectedError);
  });

  it('skal gjøre runddansen om login om man er logget ut.', async () => {
    let mock: FetchMock;
    let spy: SpyMiddleware;

    spy = new SpyMiddleware();

    mock = FetchMock.configure({
      middleware: spy.middleware
    });

    expect(spy.size()).toBe(0);

    Object.defineProperty(window, 'location', {
      value: new URL('https://localhost/loginServer')
    });

    mock.post(
      'https://helse-spion.dev.nav.no/api/v1/ytelsesperioder/oppslag',
      (req, res, ctx) => res(ctx.json(ytelser), ctx.status(401))
    );

    const { result } = renderHook(() => useYtelsesperioder(), {
      wrapper: AppStoreProvider
    });

    let getResult: any;
    const getYtelseSammendrag = result.current;
    await act(async () => {
      getResult = await getYtelseSammendrag('12345678901', '123456789');
    });

    expect(getResult).toEqual({ title: '401', type: '401' });
    expect(window.location.href).toBe(
      'https://helse-spion.dev.nav.no/local/cookie-please?subject=10107400090&redirect=http://localhost:3000/min-side-refusjon/'
    );
  });
});

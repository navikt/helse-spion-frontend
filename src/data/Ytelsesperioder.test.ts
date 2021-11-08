import { renderHook, act } from '@testing-library/react-hooks';
import Ytelsesperioder from './Ytelsesperioder';
import { AppStoreProvider } from '../data/store/AppStore';
import ytelser from '../mockdata/mockYtelser';
import FetchMock, { SpyMiddleware } from 'yet-another-fetch-mock';

describe('Ytelsesperioder', () => {
  it('skal returnere arbeidsgivere', async () => {
    let mock: FetchMock;
    let spy: SpyMiddleware;

    spy = new SpyMiddleware();

    mock = FetchMock.configure({
      middleware: spy.middleware
    });

    expect(spy.size()).toBe(0);

    mock.post(
      'http://localhost:8080/api/v1/ytelsesperioder/oppslag',
      (req, res, ctx) => res(ctx.json(ytelser), ctx.status(200))
    );

    const { result } = renderHook(() => Ytelsesperioder(), {
      wrapper: AppStoreProvider
    });

    const getYtelseSammendrag = result.current;
    await act(async () => {
      const getResult = await getYtelseSammendrag(
        '123456789',
        '2020.01.01',
        '2020.02.02'
      );

      expect(getResult).toBeUndefined();
    });
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
      'http://localhost:8080/api/v1/ytelsesperioder/oppslag',
      (req, res, ctx) => res(ctx.json(mockError), ctx.status(500))
    );

    const { result } = renderHook(() => Ytelsesperioder(), {
      wrapper: AppStoreProvider
    });

    const getYtelsesperioder = result.current;

    let gotError: any;

    await act(async () => {
      gotError = await getYtelsesperioder(
        '123456789',
        '2020.01.01',
        '2020.02.02'
      );
    });

    expect(spy.size()).toBe(1);
    expect(spy.lastCall()).not.toBeNull();
    expect(spy.lastUrl()).toBe(
      'http://localhost:8080/api/v1/ytelsesperioder/oppslag'
    );
    expect(gotError).toEqual(expectedError);
  });
});

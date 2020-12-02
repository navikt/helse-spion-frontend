import { renderHook, act } from '@testing-library/react-hooks';
import Ytelsesperioder from './Ytelsesperioder';
import { AppStoreProvider } from '../data/store/AppStore';
import ytelser from '../mockdata/mockYtelser';

describe('Ytelsesperioder', () => {
  it('skal returnere arbeidsgivere', async () => {
    const mockYtelser = Promise.resolve({
      status: 200,
      json: () => Promise.resolve(ytelser),
    });
    jest.spyOn(window, 'fetch').mockImplementationOnce(() => mockYtelser);

    const { result } = renderHook(() => Ytelsesperioder(),{ wrapper: AppStoreProvider } );


    const getYtelseSammendrag = result.current;
    await act(async () => {
      const getResult = await getYtelseSammendrag('123456789','2020.01.01','2020.02.02');

      expect(getResult).toBeUndefined();
    })
  });

  it('skal håndtere feil', async () => {
    const mockError = Promise.resolve({
      status: 500,
      json: () => Promise.resolve({ violations :[
         {
          validationType: 'NoeGalt',
          message: 'Noe gikk galt'
        }
      ] }),
    });
    jest.spyOn(window, 'fetch').mockImplementationOnce(() => mockError);

    const { result } = renderHook(() => Ytelsesperioder(),{ wrapper: AppStoreProvider } )

    const getYtelsesSammendrag = result.current;
    await act(async ()=> {
      const gotError = await getYtelsesSammendrag('123456789','2020.01.01','2020.02.02');

      expect(gotError).toBeUndefined();
    })
  });
});

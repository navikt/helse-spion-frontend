import { renderHook, act } from '@testing-library/react-hooks';
import useYtelseSammendrag, { convertResponseDataToYtelseSammendrag } from './useYtelseSammendrag';
import { AppStoreProvider } from '../data/store/AppStore';
import ytelser from '../mockdata/mockYtelser';

describe('useYtelseSammendrag', () => {
  it('skal returnere arbeidsgivere', async () => {
    const expected =     [
      {
        identitetsnummer: 1234,
        navn: 'Knut Knutsen',
        antall_refusjoner: 1,
        merknad: undefined,
        max_refusjon_dager: 365,
        'refusjonsbeløp': 444
      },
      {
        identitetsnummer: 234555,
        navn: 'Ole Olsen',
        antall_refusjoner: 1,
        merknad: undefined,
        max_refusjon_dager: 365,
        'refusjonsbeløp': 323
      },
      {
        identitetsnummer: 4444444,
        navn: 'Pål Pålsen',
        antall_refusjoner: 2,
        merknad: undefined,
        max_refusjon_dager: 365,
        'refusjonsbeløp': 246
      }
    ];

    const mockYtelser = Promise.resolve({
      status: 200,
      json: () => Promise.resolve(ytelser),
    });
    jest.spyOn(window, 'fetch').mockImplementationOnce(() => mockYtelser);

    const {result} = renderHook(() => useYtelseSammendrag(),{ wrapper: AppStoreProvider } );


    const getYtelseSammendrag = result.current;
    await act(async () => {
      const getResult = await getYtelseSammendrag('123456789','2020.01.01','2020.02.02');

      expect(getResult).toEqual(expected);
    })
  });

  it('skal håndtere feil', async () => {
    const expectedViolations =[
      {
        validationType: "NoeGalt",
        message: "Noe gikk galt"
      }
    ]
    const mockError = Promise.resolve({
      status: 500,
      json: () => Promise.resolve({ violations :[
         {
          validationType: "NoeGalt",
          message: "Noe gikk galt"
        }
      ]}),
    });
    jest.spyOn(window, 'fetch').mockImplementationOnce(() => mockError);

    const {result} = renderHook(() => useYtelseSammendrag(),{ wrapper: AppStoreProvider } )

    const getYtelsesSammendrag = result.current;
    await act(async ()=> {
      const gotError = await getYtelsesSammendrag('123456789','2020.01.01','2020.02.02');

      expect(gotError).toBeUndefined();
    })
  });
});

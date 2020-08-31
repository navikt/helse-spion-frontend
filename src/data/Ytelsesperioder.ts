import { useAppStore } from './store/AppStore';
import { useRef } from 'react';
import useFetch from './rest/use-fetch';
import { Ytelsesperiode } from '../util/helseSpionTypes';
import { stringToDate } from '../util/stringToDate';
import env from '../Environment'


export default (): any => {
  const { setYtelsesperioder } = useAppStore();
  const { setYtelsesperioderLoading } = useAppStore();
  const { setYtelsesperioderErrorType } = useAppStore();
  const { setYtelsesperioderErrorMessage } = useAppStore();
  const ytelsesperioder = useFetch<Ytelsesperiode[]>();
  const ytelsesperioderRef = useRef(ytelsesperioder);
  ytelsesperioderRef.current = ytelsesperioder;
  
  return (identityNumber?: string, arbeidsgiverId?: string): Promise<any> => {
    setYtelsesperioderLoading(true);

    return fetch(env.baseUrl + '/api/v1/ytelsesperioder/oppslag', {
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        'identitetsnummer': identityNumber,
        'arbeidsgiverId': arbeidsgiverId,
      }),
    }).then(response => {
      setYtelsesperioderLoading(false);
      if (response.status === 401) {
        window.location.href = env.loginServiceUrl ?? '';
      } else if (response.status === 200) {
        return response.json().then(data => {
          setYtelsesperioder(convertResponseDataToYtelsesperioder(data));
          setYtelsesperioderErrorType(undefined);
          setYtelsesperioderErrorMessage(undefined);
        }
        );
      } else { // todo: error 400/500s etc
        return response.json().then(data => { // Todo: change errors to array and map all violations
          setYtelsesperioderErrorType(data.violations[0].validationType.toUpperCase());
          setYtelsesperioderErrorMessage(data.violations[0].message);
        }
        );
      }
    });
  }
  }
  
// todo: type safety
const convertResponseDataToYtelsesperioder = (data): Ytelsesperiode[] => data.map(ytelsesperiode => ({
  ...ytelsesperiode,
  periode: {
    fom: stringToDate(ytelsesperiode.periode.fom),
    tom: stringToDate(ytelsesperiode.periode.tom),
  }
}));

import { useAppStore } from './store/AppStore';
import { Ytelsesperiode } from '../util/helseSpionTypes';
import { stringToDate } from '../util/stringToDate';
import env from '../Environment';

interface MessageBodyPeriode {
  fom: string;
  tom: string;
}

interface MessageBodyPost {
  identitetsnummer: string;
  arbeidsgiverId: string;
  periode?: MessageBodyPeriode;
}

export default (): any => {
  const {
    setYtelsesperioder,
    setYtelsesperioderLoading,
    setYtelsesperioderErrorType,
    setYtelsesperioderErrorMessage
  } = useAppStore();
  // const { setYtelsesperioderLoading } = useAppStore();
  // const { setYtelsesperioderErrorType } = useAppStore();
  // const { setYtelsesperioderErrorMessage } = useAppStore();

  return (
    identityNumber?: string,
    arbeidsgiverId?: string,
    fom?: string,
    tom?: string
  ): Promise<any> => {
    setYtelsesperioderLoading(true);

    const messageBody: MessageBodyPost = {
      identitetsnummer: identityNumber || '',
      arbeidsgiverId: arbeidsgiverId || ''
    };

    if (fom && tom) {
      messageBody.periode = {
        fom: fom,
        tom: tom
      };
    } else {
      delete messageBody.periode;
    }

    return fetch(env.baseUrl + '/api/v1/ytelsesperioder/oppslag', {
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(messageBody)
    }).then((response) => {
      setYtelsesperioderLoading(false);
      if (response.status === 401) {
        window.location.href = env.loginServiceUrl ?? '';
      } else if (response.status === 200) {
        return response.json().then((data) => {
          setYtelsesperioder(convertResponseDataToYtelsesperioder(data));
          setYtelsesperioderErrorType(undefined);
          setYtelsesperioderErrorMessage(undefined);
        });
      } else {
        // todo: error 400/500s etc
        if (response.status === 400) {
          setYtelsesperioderErrorType(response.status.toString());
          setYtelsesperioderErrorMessage(response.statusText);
          return;
        }
        return response.json().then((data) => {
          // Todo: change errors to array and map all violations
          setYtelsesperioderErrorType(
            data.violations[0].validationType.toUpperCase()
          );
          setYtelsesperioderErrorMessage(data.violations[0].message);
        });
      }
    });
  };
};
// todo: type safety
const convertResponseDataToYtelsesperioder = (data): Ytelsesperiode[] =>
  data.map((ytelsesperiode) => ({
    ...ytelsesperiode,
    periode: {
      fom: stringToDate(ytelsesperiode.periode.fom),
      tom: stringToDate(ytelsesperiode.periode.tom)
    }
  }));

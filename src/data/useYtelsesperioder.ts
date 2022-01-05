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

interface ErrorReturnvalue {
  type: string;
  title: string;
}

export default function useYtelsesperioder(): any {
  const {
    setYtelsesperioder,
    setYtelsesperioderLoading,
    setYtelsesperioderErrorType,
    setYtelsesperioderErrorMessage
  } = useAppStore();

  return (
    identityNumber?: string,
    arbeidsgiverId?: string,
    fom?: string,
    tom?: string
  ): Promise<void | undefined | ErrorReturnvalue | Ytelsesperiode[]> => {
    setYtelsesperioderLoading(true);

    const messageBody: MessageBodyPost = {
      identitetsnummer: setBlankIfUndefined(identityNumber),
      arbeidsgiverId: setBlankIfUndefined(arbeidsgiverId)
    };

    setFomTom(fom, tom, messageBody);

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
        window.location.href = setBlankIfUndefined(env.loginServiceUrl);
        return {
          type: '401',
          title: '401'
        };
      } else if (response.status === 200) {
        return response.json().then((data) => {
          const ytelsesperioder: Ytelsesperiode[] =
            convertResponseDataToYtelsesperioder(data);
          setYtelsesperioder(ytelsesperioder);
          setYtelsesperioderErrorType(undefined);
          setYtelsesperioderErrorMessage(undefined);
          return ytelsesperioder;
        });
      } else {
        if (response.status === 500) {
          return response.json().then((data) => {
            setYtelsesperioderErrorType(data.type.toUpperCase());
            setYtelsesperioderErrorMessage(data.title);
            return {
              type: data.type.toUpperCase(),
              title: data.title
            };
          });
        }

        if (response.status === 400) {
          setYtelsesperioderErrorType(response.status.toString().toUpperCase());
          setYtelsesperioderErrorMessage(response.statusText);
          return {
            type: response.status.toString().toUpperCase(),
            title: response.statusText
          };
        }
        return response.json().then((data) => {
          if (response.status === 500) {
            setYtelsesperioderErrorType(data.type.toUpperCase());
            setYtelsesperioderErrorMessage(data.title);
          } else {
            setYtelsesperioderErrorType(
              data.violations[0].validationType.toUpperCase()
            );
            setYtelsesperioderErrorMessage(data.violations[0].message);
          }
        });
      }
    });
  };
}

const convertResponseDataToYtelsesperioder = (data): Ytelsesperiode[] =>
  data.map((ytelsesperiode) => ({
    ...ytelsesperiode,
    periode: {
      fom: stringToDate(ytelsesperiode.periode.fom),
      tom: stringToDate(ytelsesperiode.periode.tom)
    }
  }));

function setBlankIfUndefined(
  posiblyUndefinedString: string | undefined
): string {
  return posiblyUndefinedString ?? '';
}

function setFomTom(
  fom: string | undefined,
  tom: string | undefined,
  messageBody: MessageBodyPost
) {
  if (fom && tom) {
    messageBody.periode = {
      fom: fom,
      tom: tom
    };
  } else {
    delete messageBody.periode;
  }
}

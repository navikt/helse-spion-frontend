import { useAppStore } from './store/AppStore';
// import { useRef } from 'react';
// import useFetch from './rest/use-fetch';
import { Ytelsesperiode } from '../util/helseSpionTypes';
import { stringToDate } from '../util/stringToDate';
import { YtelseSammendrag } from '../util/helseSpionTypes';
import { any } from 'prop-types';

const useYtelseSammendrag = (): any => {
  const {setYtelsesammendrag} = useAppStore();
  const {setYtelsesperioderLoading} = useAppStore();
  const {setYtelsesperioderErrorType} = useAppStore();
  const {setYtelsesperioderErrorMessage} = useAppStore();
  // const ytelsesperioder = useFetch<any>();
  // const ytelsesperioderRef = useRef(ytelsesperioder);
  // ytelsesperioderRef.current = ytelsesperioder;

  return (arbeidsgiverId?: string, fom?: string, tom?: string): Promise<void | YtelseSammendrag[] | undefined> => {
    setYtelsesperioderLoading(true);
    let periodefilter = '';
    fom = "2010-01-01";
    tom = "2022-01-01";
    if (fom && fom.trim().length > 1) {
      periodefilter = periodefilter += `?fom=${fom}`;
    }
    if (tom && tom.trim().length > 1) {
      periodefilter = periodefilter += `&tom=${tom}`;
    }
// /api/v1/ytelsesperioder/virksomhet/711485759?fom=2020-01-01&tom=2020-12-31
    return fetch(process.env.REACT_APP_BASE_URL + `/api/v1/ytelsesperioder/virksomhet/${arbeidsgiverId}${periodefilter}`, {
      credentials: 'include',
      // headers: {
      //   'Accept': 'application/json',
      //   'Content-Type': 'application/json',
      // },
      method: 'GET',
    }).then(response => {
      setYtelsesperioderLoading(false);
      if (response.status === 401) {
        window.location.href = process.env.REACT_APP_LOGIN_SERVICE_URL ?? '';
      } else if (response.status === 200) {
        return response.json().then(data => {
          setYtelsesammendrag(convertResponseDataToYtelseSammendrag(data));
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
const convertResponseDataToYtelseSammendrag = (data: any): YtelseSammendrag[] => {
  const sammendrag:YtelseSammendrag[] = [];
  let ytelsesElement: YtelseSammendrag;
  data.forEach(element => {
    let ytelsesElementIndex: number  =  sammendrag.findIndex(sammendragElement => {
      if(sammendragElement.identitetsnummer === element.arbeidsforhold.arbeidstaker.identitetsnummer) {
        return sammendragElement;
      }
    })

    if (ytelsesElementIndex === -1) {
      ytelsesElement = {
        identitetsnummer: element.arbeidsforhold.arbeidstaker.identitetsnummer,
        navn: (element.arbeidsforhold.arbeidstaker.fornavn + ' ' + element.arbeidsforhold.arbeidstaker.etternavn).trim(),
        antall_refusjoner: 1,
        merknad: element.merknad,
        max_refusjon_dager: 0,
        refusjonsbeløp: element.refusjonsbeløp
      }
      sammendrag.push(ytelsesElement);
    } else {
      ytelsesElement = sammendrag[ytelsesElementIndex];
      ytelsesElement.antall_refusjoner += 1;
      ytelsesElement.refusjonsbeløp += element.refusjonsbeløp;
    }
  })

  return sammendrag;
};

export default useYtelseSammendrag;

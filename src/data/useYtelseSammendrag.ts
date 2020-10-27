import { useAppStore } from './store/AppStore';
import { useYtelseSammendragContext } from './store/YtelseSamendrag';
import { YtelseSammendrag } from '../util/helseSpionTypes';
import dayjs from 'dayjs';
import env from '../Environment';


const useYtelseSammendrag = (): any => {
  const { setYtelsesammendrag } = useYtelseSammendragContext();
  const { setYtelsesperioderLoading } = useAppStore();
  const { setYtelsesperioderErrorType } = useAppStore();
  const { setYtelsesperioderErrorMessage } = useAppStore();

  const getYtelseSammendrag = (arbeidsgiverId?: string, fom?: string, tom?: string): Promise<void | YtelseSammendrag[] | undefined> => {
    setYtelsesperioderLoading(true);
    let periodefilter = '';

    if (fom && fom.trim().length > 1) {
      periodefilter = periodefilter += `?fom=${fom}`;
    }
    if (tom && tom.trim().length > 1) {
      periodefilter = periodefilter += `&tom=${tom}`;
    }
    return fetch(env.baseUrl + `/api/v1/ytelsesperioder/virksomhet/${arbeidsgiverId}${periodefilter}`, {
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
          const convertedResponseData = convertResponseDataToYtelseSammendrag(data);
          setYtelsesammendrag(convertedResponseData);
          setYtelsesperioderErrorType(undefined);
          setYtelsesperioderErrorMessage(undefined);
          return convertedResponseData;
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

  return getYtelseSammendrag;
  }

// todo: type safety
export const convertResponseDataToYtelseSammendrag = (data: any): YtelseSammendrag[] => {
  const sammendrag:YtelseSammendrag[] = [];
  let ytelsesElement: YtelseSammendrag;
  data.forEach(element => {
    let ytelsesElementIndex: number  =  sammendrag.findIndex(sammendragElement => {
      if(sammendragElement.identitetsnummer === element.arbeidsforhold.arbeidstaker.identitetsnummer) {
        return sammendragElement;
      }
    })

    const refusjonsdager: any = dayjs(element.periode.tom).diff(dayjs(element.periode.fom), 'day');

    if (ytelsesElementIndex === -1) {
      ytelsesElement = {
        identitetsnummer: element.arbeidsforhold.arbeidstaker.identitetsnummer,
        navn: (element.arbeidsforhold.arbeidstaker.fornavn + ' ' + element.arbeidsforhold.arbeidstaker.etternavn).trim(),
        antall_refusjoner: 1,
        merknad: element.merknad,
        max_refusjon_dager: refusjonsdager,
        refusjonsbeløp: element.refusjonsbeløp
      }
      sammendrag.push(ytelsesElement);
    } else {
      ytelsesElement = sammendrag[ytelsesElementIndex];
      ytelsesElement.antall_refusjoner += 1;
      ytelsesElement.refusjonsbeløp += element.refusjonsbeløp;
      ytelsesElement.max_refusjon_dager = ytelsesElement.max_refusjon_dager > refusjonsdager ? ytelsesElement.max_refusjon_dager : refusjonsdager;
    }
  })

  return sammendrag;
};

export default useYtelseSammendrag;

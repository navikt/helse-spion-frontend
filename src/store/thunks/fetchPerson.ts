import { fetchPersonError, fetchPersonStarted, fetchPersonSuccess } from "../actions/helseSpionActions";
import { Ytelsesperiode } from "../types/helseSpionTypes";
import { stringToDate } from "../../util/stringToDate";
import { Dispatch } from "redux";

export function fetchPerson(identityNumber?: string): (dispatch: Dispatch) => Promise<void> {
  return async dispatch => {
    dispatch(fetchPersonStarted());
    await fetch('http://localhost:3000/api/v1/ytelsesperioder/oppslag', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        'identitetsnummer': identityNumber,
        'arbeidsgiverOrgnr': '910098896',
      }),
    }).then(response => {
      if (response.status === 401) {
        alert("redirect");
        return dispatch(fetchPersonError());
      } else if (response.status === 200) {
        // todo: type safety on data response
        return response.json().then(data =>
          dispatch(fetchPersonSuccess(convertResponseDataToYtelsesperiode(data[0])))
        );
      } else {
        return dispatch(fetchPersonError());
      }
    });
  }
}

// todo: type safety
const convertResponseDataToYtelsesperiode = (data): Ytelsesperiode => {
  return {
    ...data,
    periode: {
      fom: stringToDate(data.periode.fom),
      tom: stringToDate(data.periode.tom),
    },
    ferieperioder: data.ferieperioder.map(ferieperioder => {
      return {
        ...ferieperioder,
        ferieperioder: {
          fom: stringToDate(ferieperioder.fom),
          tom: stringToDate(ferieperioder.tom),
        }
      }
    })
  };
};

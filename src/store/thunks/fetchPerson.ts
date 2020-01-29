import { fetchPersonError, fetchPersonStarted, fetchPersonSuccess } from "../actions/helseSpionActions";
import { Sak } from "../types/helseSpionTypes";
import { stringToDate } from "../../util/stringToDate";
import { Dispatch } from "redux";

export function fetchPerson(identitetsnummerSøk?: string): (dispatch: Dispatch) => Promise<void> {
  return async dispatch => {
    dispatch(fetchPersonStarted());
    await fetch('http://localhost:3000/api/v1/saker/oppslag', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        "identitetsnummer": identitetsnummerSøk,
        "arbeidsgiverOrgnr": "2"
      }),
    }).then(response => {
      if (response.status === 401) {
        alert("redirect");
        return dispatch(fetchPersonError());
      } else if (response.status === 200) {
        // todo: type safety on data response
        return response.json().then(data =>
          dispatch(fetchPersonSuccess(convertResponseDataToSak(data[0])))
        );
      } else {
        return dispatch(fetchPersonError());
      }
    });
  }
}

// todo: type safety
const convertResponseDataToSak = (data): Sak => {
  return {
    ...data,
    oppsummering: {
      ...data.oppsummering,
      periode: {
        ...data.oppsummering.periode,
        fom: stringToDate(data.oppsummering.periode.fom),
        tom: stringToDate(data.oppsummering.periode.tom),
      }
    },
    ytelsesperioder: data.ytelsesperioder.map(ytelsesperiode => {
      return {
        ...ytelsesperiode,
        periode: {
          fom: stringToDate(ytelsesperiode.periode.fom),
          tom: stringToDate(ytelsesperiode.periode.tom),
        }
      }
    })
  };
};

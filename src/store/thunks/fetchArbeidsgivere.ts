import {
  fetchArbeidsgivereError,
  fetchArbeidsgivereStarted,
  fetchArbeidsgivereSuccess
} from "../actions/helseSpionActions";
import { Dispatch } from "redux";

export function fetchArbeidsgivere(): (dispatch: Dispatch) => Promise<void> {
  return async dispatch => {
    dispatch(fetchArbeidsgivereStarted());
    await fetch('http://localhost:3000/api/v1/arbeidsgivere')
      .then(response => {
        if (response.status !== 200) {
          dispatch(fetchArbeidsgivereError());
        } else {
          response.json().then(data => dispatch(fetchArbeidsgivereSuccess(data)))
        }
      })
  };
}

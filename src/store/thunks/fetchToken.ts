import { fetchTokenError, fetchTokenStarted, fetchTokenSuccess } from "../actions/helseSpionActions";
import { Dispatch } from "redux";

export function fetchToken(): (dispatch: Dispatch) => Promise<void> {
  return async dispatch => {
    dispatch(fetchTokenStarted());
    await fetch('http://localhost:3000/local/cookie-please?subject=12321')
      .then(response => {
        if (response.status !== 200) {
          dispatch(fetchTokenError());
        } else {
          dispatch(fetchTokenSuccess())
        }
      })
  };
}

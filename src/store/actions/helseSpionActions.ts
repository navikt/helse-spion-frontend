import { HelseSpionActionTypes, HelseSpionTypes, Sak } from "../types/helseSpionTypes";

export const fetchPersonStarted = (): HelseSpionActionTypes => {
  return {
    type: HelseSpionTypes.FETCH_PERSON_STARTED,
  }
};

export const fetchPersonSuccess = (sak: Sak): HelseSpionActionTypes => {
  return {
    type: HelseSpionTypes.FETCH_PERSON_SUCCESS,
    sak: sak,
  }
};

export const fetchPersonError = (): HelseSpionActionTypes => {
  return {
    type: HelseSpionTypes.FETCH_PERSON_ERROR,
  }
};

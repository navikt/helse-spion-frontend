import { HelseSpionActions, HelseSpionTypes, Sak } from "../types/helseSpionTypes";

export const fetchPersonStarted = (): HelseSpionActions => {
  return {
    type: HelseSpionTypes.FETCH_PERSON_STARTED,
  }
};

export const fetchPersonSuccess = (sak: Sak): HelseSpionActions => {
  return {
    type: HelseSpionTypes.FETCH_PERSON_SUCCESS,
    sak: sak,
  }
};

export const fetchPersonError = (): HelseSpionActions => {
  return {
    type: HelseSpionTypes.FETCH_PERSON_ERROR,
  }
};

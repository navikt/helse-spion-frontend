import { HelseSpionActions, HelseSpionTypes, Person } from "../types/helseSpionTypes";

export const fetchPersonStarted = (): HelseSpionActions => {
  return {
    type: HelseSpionTypes.FETCH_PERSON_STARTED,
  }
};

export const fetchPersonSuccess = (person: Person): HelseSpionActions => {
  return {
    type: HelseSpionTypes.FETCH_PERSON_SUCCESS,
    person: person,
  }
};

export const fetchPersonError = (): HelseSpionActions => {
  return {
    type: HelseSpionTypes.FETCH_PERSON_ERROR,
  }
};

export const setFom = (date: Date): HelseSpionActions => {
  return {
    type: HelseSpionTypes.SET_FOM,
    fom: date,
  }
};

export const setTom = (date: Date): HelseSpionActions => {
  return {
    type: HelseSpionTypes.SET_TOM,
    tom: date,
  }
};

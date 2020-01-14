import {HelseSpionActions, HelseSpionTypes, Person} from "../types/helseSpionTypes";

export const fetchPersonSuccess = (person: Person): HelseSpionActions => {
  return {
    type: HelseSpionTypes.FETCH_PERSON,
    person: person,
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

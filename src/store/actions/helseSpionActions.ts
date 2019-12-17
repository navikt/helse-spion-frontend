import {HelseSpionActions, HelseSpionTypes} from "../types/helseSpionTypes";

export function fetchPerson(): HelseSpionActions {
  return {
    type: HelseSpionTypes.FETCH_PERSON,
  }
}

export function setFOM(date: Date): HelseSpionActions {
  return {
    type: HelseSpionTypes.SET_FOM,
    fom: date,
  }
}

export function setTOM(date: Date): HelseSpionActions {
  return {
    type: HelseSpionTypes.SET_TOM,
    tom: date,
  }
}

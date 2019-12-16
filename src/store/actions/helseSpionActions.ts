import { FETCH_PERSON, HelseSpionActionTypes } from "../types/helseSpionTypes";

export function fetchPerson(): HelseSpionActionTypes {
  return {
    type: FETCH_PERSON,
  }
}

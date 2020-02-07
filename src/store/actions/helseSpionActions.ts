import { Arbeidsgiver, HelseSpionActionTypes, HelseSpionTypes, Ytelsesperiode } from "../types/helseSpionTypes";

export const fetchPersonStarted = (): HelseSpionActionTypes => {
  return {
    type: HelseSpionTypes.FETCH_PERSON_STARTED,
  }
};

export const fetchPersonSuccess = (ytelsesperioder: Ytelsesperiode): HelseSpionActionTypes => {
  return {
    type: HelseSpionTypes.FETCH_PERSON_SUCCESS,
    ytelsesperioder: ytelsesperioder,
  }
};

export const fetchPersonError = (): HelseSpionActionTypes => {
  return {
    type: HelseSpionTypes.FETCH_PERSON_ERROR,
  }
};

export const fetchTokenStarted = (): HelseSpionActionTypes => {
  return {
    type: HelseSpionTypes.FETCH_TOKEN_STARTED,
  }
};

export const fetchTokenSuccess = (): HelseSpionActionTypes => {
  return {
    type: HelseSpionTypes.FETCH_TOKEN_SUCCESS,
  }
};

export const fetchTokenError = (): HelseSpionActionTypes => {
  return {
    type: HelseSpionTypes.FETCH_TOKEN_ERROR,
  }
};

export const fetchArbeidsgivereStarted = (): HelseSpionActionTypes => {
  return {
    type: HelseSpionTypes.FETCH_ARBEIDSGIVERE_STARTED,
  }
};

export const fetchArbeidsgivereSuccess = (arbeidsgivere: Arbeidsgiver[]): HelseSpionActionTypes => {
  return {
    type: HelseSpionTypes.FETCH_ARBEIDSGIVERE_SUCCESS,
    arbeidsgivere: arbeidsgivere,
  }
};

export const fetchArbeidsgivereError = (): HelseSpionActionTypes => {
  return {
    type: HelseSpionTypes.FETCH_ARBEIDSGIVERE_ERROR,
  }
};


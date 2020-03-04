import { HelseSpionActionTypes, HelseSpionState, HelseSpionTypes } from "../types/helseSpionTypes";
import { Action } from "redux";

const initialHelseSpionState: HelseSpionState = {
  arbeidsgivere: [],
  ytelsesperioder: [],
  personLoading: false,
  personError: false,
  tokenLoading: false,
  tokenFetched: false,
  tokenError: false,
  arbeidsgivereLoading: false,
  arbeidsgivereError: false
};

export function helseSpionReducer (
  state = initialHelseSpionState,
  incomingAction: Action
): HelseSpionState {
  const action = incomingAction as HelseSpionActionTypes;
  switch (action.type) {

    case HelseSpionTypes.FETCH_ARBEIDSGIVERE_STARTED:
      return {
        ...state,
        arbeidsgivereLoading: true,
        arbeidsgivereError: false,
      };
  
    case HelseSpionTypes.FETCH_ARBEIDSGIVERE_SUCCESS:
      return {
        ...state,
        arbeidsgivere: action.arbeidsgivere,
        arbeidsgivereLoading: false,
      };
  
    case HelseSpionTypes.FETCH_ARBEIDSGIVERE_ERROR:
      return {
        ...state,
        arbeidsgivereLoading: false,
        arbeidsgivereError: true,
      };
  
    case HelseSpionTypes.FETCH_PERSON_STARTED:
      return {
        ...state,
        personLoading: true,
        personError: false,
      };
  
    case HelseSpionTypes.FETCH_PERSON_SUCCESS:
      return {
        ...state,
        ytelsesperioder: action.ytelsesperioder,
        personLoading: false,
      };
  
    case HelseSpionTypes.FETCH_PERSON_ERROR:
      return {
        ...state,
        personLoading: false,
        personError: true,
      };
      
    default:
      return state
  }
}

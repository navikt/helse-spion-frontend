import { HelseSpionActions, HelseSpionState, HelseSpionTypes } from "../types/helseSpionTypes";
import { Action } from "redux";

const initialHelseSpionState: HelseSpionState = {
  sak: undefined,
  error: false,
};

export function helseSpionReducer (
  state = initialHelseSpionState,
  incomingAction: Action
): HelseSpionState {
  const action = incomingAction as HelseSpionActions;
  switch (action.type) {
    case HelseSpionTypes.FETCH_PERSON_STARTED:
      return {
        ...state,
        error: false,
      };
  
    case HelseSpionTypes.FETCH_PERSON_SUCCESS:
      return {
        ...state,
        sak: action.sak,
      };
  
    case HelseSpionTypes.FETCH_PERSON_ERROR:
      return {
        ...state,
        error: true,
      };
      
    default:
      return state
  }
}

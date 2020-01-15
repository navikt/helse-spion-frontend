import { HelseSpionActions, HelseSpionState, HelseSpionTypes } from "../types/helseSpionTypes";
import { Action } from "redux";

const initialHelseSpionState: HelseSpionState = {
  person: undefined
};

export function helseSpionReducer (
  state = initialHelseSpionState,
  incomingAction: Action
): HelseSpionState {
  const action = incomingAction as HelseSpionActions;
  switch (action.type) {
    case HelseSpionTypes.FETCH_PERSON:
      return {
        ...state,
        person: action.person,
      };

    case HelseSpionTypes.SET_FOM:
      return {
        ...state,
        fom: action.fom,
      };

    case HelseSpionTypes.SET_TOM:
      return {
        ...state,
        tom: action.tom,
      };

    default:
      return state
  }
}

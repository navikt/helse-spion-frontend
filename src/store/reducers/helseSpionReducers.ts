import { HelseSpionActions, HelseSpionState, HelseSpionTypes } from "../types/helseSpionTypes";

const initialHelseSpionState: HelseSpionState = {
  person: undefined
};

export function helseSpionReducer (
  state = initialHelseSpionState,
  action: HelseSpionActions
): HelseSpionState {
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

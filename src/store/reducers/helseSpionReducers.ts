import { HelseSpionActions, HelseSpionState, HelseSpionTypes } from "../types/helseSpionTypes";

const initialHelseSpionState: HelseSpionState = {
  fødselsnummerSøk: undefined,
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
      };

    case HelseSpionTypes.SET_FOM:
      return {
        ...state,
        fom: action.fom
      };

    case HelseSpionTypes.SET_TOM:
      return {
        ...state,
        tom: action.tom
      };

    default:
      return state
  }
}

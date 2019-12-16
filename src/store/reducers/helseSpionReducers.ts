import { FETCH_PERSON, HelseSpionActionTypes, HelseSpionState } from "../types/helseSpionTypes";

const initialHelseSpionState: HelseSpionState = {
  fødselsnummerSøk: undefined,
  person: undefined
};

export function helseSpionReducer (
  state = initialHelseSpionState,
  action: HelseSpionActionTypes
): HelseSpionState {
  switch (action.type) {
    case FETCH_PERSON:
      return {
        ...state,
      };

    default:
      return state
  }
}

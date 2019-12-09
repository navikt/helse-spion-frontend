import { EXAMPLE_COPY, EXAMPLE_DECREMENT, EXAMPLE_INCREMENT, ExampleActionTypes, ExampleState } from "./types";

const initialExampleState: ExampleState = {
  counter: 0,
  copies: []
};

export function exampleReducer (
  state = initialExampleState,
  action: ExampleActionTypes
): ExampleState {
  switch (action.type) {
    case EXAMPLE_INCREMENT:
      return {
        ...state,
        counter: state.counter + 1
      };

    case EXAMPLE_DECREMENT:
      return {
        ...state,
        counter: state.counter - 1
      };

    case EXAMPLE_COPY:
      return {
        ...state,
        copies: [...state.copies, state.counter]
      };

    default:
      return state
  }
}
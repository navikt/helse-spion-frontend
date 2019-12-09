import { EXAMPLE_COPY, EXAMPLE_DECREMENT, EXAMPLE_INCREMENT, ExampleActionTypes } from "./types";

export function exampleIncrement(): ExampleActionTypes {
  return {
    type: EXAMPLE_INCREMENT,
  }
}

export function exampleDecrement(): ExampleActionTypes {
  return {
    type: EXAMPLE_DECREMENT,
  }
}

export function exampleCopy(): ExampleActionTypes {
  return {
    type: EXAMPLE_COPY,
  }
}
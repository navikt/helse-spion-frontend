export const EXAMPLE_INCREMENT = 'EXAMPLE_INCREMENT';
export const EXAMPLE_DECREMENT = 'EXAMPLE_DECREMENT';
export const EXAMPLE_COPY = 'EXAMPLE_SNAPSHOT';

export interface ExampleState {
  counter: number
  copies: number[]
}

interface ExampleIncrementAction {
  type: typeof EXAMPLE_INCREMENT
}

interface ExampleDecrementAction {
  type: typeof EXAMPLE_DECREMENT
}

interface ExampleCopyAction {
  type: typeof EXAMPLE_COPY
}

export type ExampleActionTypes = ExampleIncrementAction | ExampleDecrementAction | ExampleCopyAction
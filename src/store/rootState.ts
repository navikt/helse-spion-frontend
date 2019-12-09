import { ExampleState } from "./example/types";
import { combineReducers } from "redux";
import { exampleReducer } from "./example/reducers";

export interface RootState {
  exampleState: ExampleState,
}

export const rootReducer = combineReducers({
  exampleState: exampleReducer,
});

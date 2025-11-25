// src/app/state/example.reducer.ts
import { createReducer, on, Action } from '@ngrx/store';
import * as ExampleActions from './example.actions';

export interface ExampleState {
  someValue: string;
}

export const initialExampleState: ExampleState = {
  someValue: '',
};

const _exampleReducer = createReducer(
  initialExampleState,
  on(ExampleActions.someAction, (state, { payload }) => ({
    ...state,
    someValue: payload,
  })),
  on(ExampleActions.resetAction, (state) => ({
    ...state,
    someValue: '',
  })),
);

export function exampleReducer(state: ExampleState | undefined, action: Action) {
  return _exampleReducer(state, action);
}

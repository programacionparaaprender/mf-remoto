import { increment, decrement, reset, incrementSuccess, incrementFailure } from './counter.actions';
// src/app/state/example.reducer.ts
import { createReducer, on, Action } from '@ngrx/store';
import * as ExampleActions from './counter.actions';



export interface CounterState {
  counterValue: number;
}

export const initialCounterState: CounterState = {
  counterValue: 0,
};

const _counterReducer = createReducer(
  initialCounterState,
  on(ExampleActions.counterAction, (state, { payload }) => ({
    ...state,
    counterValue: payload,
  })),
  on(increment, (state) => ({
    ...state,
    counterValue: state.counterValue + 1,
  })),
  on(incrementSuccess, (state, {counters}) => ({
    ...state,
    counterValue: counters + 1,
  })),
  on(incrementFailure, (state:any, { error }) => ({
    ...state,
  })),
  on(decrement, (state) => ({
    ...state,
    counterValue: state.counterValue - 1,
  })),
  on(reset, (state) => ({
    ...state,
    counterValue: 0,
  }))
);

export function counterReducer(state: CounterState | undefined, action: Action) {
  return _counterReducer(state, action);
}

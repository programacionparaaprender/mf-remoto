// src/app/state/example.selectors.ts
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CounterState } from './counter.reducer';

export const selectCounterState = createFeatureSelector<CounterState>('counterState');

export const selectCounterValue = createSelector(
  selectCounterState,
  (state: CounterState) => state.counterValue,
);

// src/app/state/example.selectors.ts
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ExampleState } from './example.reducer'; 

export const selectExampleState = createFeatureSelector<ExampleState>('exampleState');

export const selectSomeValue = createSelector(
  selectExampleState,
  (state: ExampleState) => state.someValue,
);

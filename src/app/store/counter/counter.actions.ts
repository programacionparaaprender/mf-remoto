
// src/app/state/example.actions.ts
import { createAction, props } from '@ngrx/store';

export const counterAction = createAction(
  '[Example] Counter Action',
  props<{ payload: number }>(),
);

export const increment = createAction('[Counter Component] Increment');
export const incrementSuccess = createAction(
  '[Counter Component] Increment Success',
  props<{ counters: number }>()
);
export const incrementFailure = createAction(
  '[Counter Component] Increment Failure',
  props<{ error: any }>()
);

export const decrement = createAction('[Counter Component] Decrement');
export const reset = createAction('[Counter Component] Reset');



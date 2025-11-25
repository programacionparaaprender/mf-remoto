// src/app/state/example.actions.ts
import { createAction, props } from '@ngrx/store';

export const someAction = createAction(
  '[Example] Some Action',
  props<{ payload: string }>(),
);

export const resetAction = createAction('[Example] Some Action Reset');

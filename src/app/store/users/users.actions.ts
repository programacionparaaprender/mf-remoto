// src/app/state/example.actions.ts
import { createAction, props } from '@ngrx/store';
import { UserStore } from './user-store';

export const someAction = createAction(
  '[Users] Action Add',
  props<{ payload: UserStore }>(),
);

export const resetAction = createAction('[Users] Action Reset');

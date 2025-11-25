// src/app/state/example.selectors.ts
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserState } from './users.reducer'; 

export const selectUserState = createFeatureSelector<UserState>('userState');


export const selectAllUsers = createSelector(
  selectUserState,
  (state: UserState) => state.userList
);

// src/app/state/example.reducer.ts
import { createReducer, on, Action } from '@ngrx/store';
import * as ExampleActions from './users.actions';
import { UserStore } from './user-store';

export interface UserState {
  userList: UserStore[];
}

export const initialUserState: UserState = {
  userList: [],
};

const _userReducer = createReducer(
  initialUserState,
  on(ExampleActions.someAction, (state:any, { payload }) => ({
    ...state,
    userList:[...state.userList, payload],
  })),
  on(ExampleActions.resetAction, (state) => ({
    ...state,
    userList: [],
  })),
);

export function userReducer(state: UserState | undefined, action: Action) {
  return _userReducer(state, action);
}

import { createAction, props } from '@ngrx/store';

const logIn = createAction(
  '[Login Page] Login requested',
  props<{ email: string; password: string }>()
);

const logInSuccess = createAction(
  '[Login Page] Login success',
  props<{ token: string }>()
);

const logInFailed = createAction('[Login Page] Login failed');

const logOut = createAction('[Login Page] Logout requested');

const logOutSuccess = createAction('[Login Page] Logout success');

const logOutFailed = createAction('[Login Page] Logout failed');

export const AuthActions = {
  logIn,
  logInSuccess,
  logInFailed,
  logOut,
  logOutSuccess,
  logOutFailed,
}

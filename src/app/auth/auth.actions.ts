import { createAction, props } from '@ngrx/store'
import { IUser } from './models';

const logIn = createAction(
  '[Login Page] Login requested',
  props<{ email: string; password: string }>()
)

const logInSuccess = createAction(
  '[Login Page] Login success',
  props<{ token: string }>()
)

const logInFailed = createAction('[Login Page] Login failed')

const logOut = createAction('[Login Page] Logout requested')

const logOutSuccess = createAction('[Login Page] Logout success')

const logOutFailed = createAction('[Login Page] Logout failed')

const loadUserDetails = createAction('[Login Page] Load user details')

const loadUserDetailsSuccess = createAction('[Login Page] Load user details success',
  props<{ userDetails: IUser }>()
)

const loadUserDetailsFailed = createAction('[Login Page] Load user details failed')

export const AuthActions = {
  logIn,
  logInSuccess,
  logInFailed,
  logOut,
  logOutSuccess,
  logOutFailed,
  loadUserDetails,
  loadUserDetailsSuccess,
  loadUserDetailsFailed,
}

import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';

export const authFeatureKey = 'auth'

export const initialState: IAuthState = {
  token: '',
  isLoggedIn: false,
  isActionInProgress: false,
}

export interface IAuthState {
  token: string
  isLoggedIn: boolean,
  isActionInProgress: boolean
}

const _authReducer = createReducer(
  initialState,
  on(AuthActions.logIn, (state) => ({
    ...state,
    isActionInProgress: true
  })),
  on(AuthActions.logInSuccess, (state, { token }) => ({
    ...state,
    token,
    isLoggedIn: true,
    isActionInProgress: false
  })),
  on(AuthActions.logInFailed, (state) => ({
    ...state,
    isActionInProgress: false
  })),
  on(AuthActions.logOut, (state) => ({
    ...state,
    isActionInProgress: true
  })),
  on(AuthActions.logOutSuccess, (state) => ({
    ...state,
    token: '',
    isLoggedIn: false,
    isActionInProgress: false
  })),
  on(AuthActions.logOutFailed, (state) => ({
    ...state,
    isActionInProgress: false
  })),
)

export function authReducer(state: IAuthState = initialState, action: any) {
  return _authReducer(state, action);
}
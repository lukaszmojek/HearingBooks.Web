import { createFeature, createReducer, on } from '@ngrx/store';
import jwtDecode from 'jwt-decode';
import { AuthActions } from './auth.actions';
import { DecodedToken } from './decoded-token';

export const featureName = 'auth'

const initialState: IAuthState = {
  token: '',
  decodedToken: {} as DecodedToken,
  isLoggedIn: false,
  isActionInProgress: false,
}
export interface IAuthState {
  token: string
  decodedToken: DecodedToken
  isLoggedIn: boolean,
  isActionInProgress: boolean
}

const reducer = createReducer(
  initialState,
  on(AuthActions.logIn, (state) => ({
    ...state,
    isActionInProgress: true
  })),
  on(AuthActions.logInSuccess, (state, { token }) => ({
    ...state,
    token,
    decodedToken: jwtDecode<DecodedToken>(token),
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
    decodedToken: {} as DecodedToken,
    isLoggedIn: false,
    isActionInProgress: false
  })),
  on(AuthActions.logOutFailed, (state) => ({
    ...state,
    isActionInProgress: false
  })),
)

export const authFeature = createFeature({
  name: featureName,
  reducer: reducer
})
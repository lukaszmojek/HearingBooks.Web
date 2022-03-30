import { createSelector } from "@ngrx/store";
import { IApplicationState } from "../core/state";
import { IAuthState } from "./auth.reducer";

export const selectAuthFeature = (state: IApplicationState) => state.auth

export const selectIsLoggedIn = createSelector(
  selectAuthFeature,
  (state: IAuthState) => state.isLoggedIn
)

export const selectToken = createSelector(
  selectAuthFeature,
  (state: IAuthState) => state.token
)
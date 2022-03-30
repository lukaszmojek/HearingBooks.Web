import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserType } from "../core/users/models";
import { featureName, IAuthState } from "./auth.reducer";
import { DecodedToken } from "./decoded-token";

export const selectAuthFeature = createFeatureSelector<IAuthState>(featureName)

export const selectIsLoggedIn = createSelector(
  selectAuthFeature,
  (state: IAuthState) => state.isLoggedIn
)

export const selectToken = createSelector(
  selectAuthFeature,
  (state: IAuthState) => state.token
)

// ? Is selectIsLoggedIn needed in those selectors?
export const selectDecodedToken = createSelector(
  selectAuthFeature,
  selectIsLoggedIn,
  (state: IAuthState, isLoggedIn: boolean) => 
    isLoggedIn
      ? state.decodedToken
      : {} as DecodedToken
)

export const selectIsPayAsYouGo = createSelector(
  selectIsLoggedIn,
  selectDecodedToken,
  (isLoggedIn: boolean, decodedToken: DecodedToken) =>
    isLoggedIn 
      ? isUserType(decodedToken, UserType.PayAsYouGo)
      : false
)

export const selectIsSubscriber = createSelector(
  selectIsLoggedIn,
  selectDecodedToken,
  (isLoggedIn: boolean, decodedToken: DecodedToken) =>
    isLoggedIn 
      ? isUserType(decodedToken, UserType.Subscriber)
      : false
)

export const selectIsWriter = createSelector(
  selectIsLoggedIn,
  selectDecodedToken,
  (isLoggedIn: boolean, decodedToken: DecodedToken) =>
    isLoggedIn 
      ? isUserType(decodedToken, UserType.Writer)
      : false
)

export const selectIsHearingBooks = createSelector(
  selectIsLoggedIn,
  selectDecodedToken,
  (isLoggedIn: boolean, decodedToken: DecodedToken) =>
    isLoggedIn 
      ? isUserType(decodedToken, UserType.HearingBooks)
      : false
)

export const selectUserId = createSelector(
  selectIsLoggedIn,
  selectDecodedToken,
  (isLoggedIn: boolean, decodedToken: DecodedToken) =>
    isLoggedIn 
      ? decodedToken.id
      : false
)

export const selectUserName = createSelector(
  selectIsLoggedIn,
  selectDecodedToken,
  (isLoggedIn: boolean, decodedToken: DecodedToken) =>
    isLoggedIn 
      ? decodedToken.name
      : false
)

function isUserType(decodedToken: DecodedToken, userType: UserType): boolean {
  if (!decodedToken) {
    return false
  }

  return decodedToken.type == userType
}

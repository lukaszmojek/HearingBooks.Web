import { createFeatureSelector, createSelector } from '@ngrx/store'
import { UserType } from '../shared/users/models'
import { featureName, IAuthState } from './auth.reducer'
import { DecodedToken } from './decoded-token'

export const selectAuthFeature = createFeatureSelector<IAuthState>(featureName)

export const selectIsLoggedIn = createSelector(
  selectAuthFeature,
  (state: IAuthState) => state.isLoggedIn
)

export const selectToken = createSelector(
  selectAuthFeature,
  (state: IAuthState) => state.token
)

export const selectDecodedToken = createSelector(
  selectAuthFeature,
  selectIsLoggedIn,
  (state: IAuthState, isLoggedIn: boolean) =>
    isLoggedIn ? state.decodedToken : ({} as DecodedToken)
)

export const selectIsPayAsYouGo = createSelector(
  selectDecodedToken,
  (decodedToken: DecodedToken) => isUserType(decodedToken, UserType.PayAsYouGo)
)

export const selectIsSubscriber = createSelector(
  selectDecodedToken,
  (decodedToken: DecodedToken) => isUserType(decodedToken, UserType.Subscriber)
)

export const selectIsWriter = createSelector(
  selectDecodedToken,
  (decodedToken: DecodedToken) => isUserType(decodedToken, UserType.Writer)
)

export const selectIsHearingBooks = createSelector(
  selectDecodedToken,
  (decodedToken: DecodedToken) =>
    isUserType(decodedToken, UserType.HearingBooks)
)

export const selectUserId = createSelector(
  selectIsLoggedIn,
  selectDecodedToken,
  (isLoggedIn: boolean, decodedToken: DecodedToken) =>
    isLoggedIn ? decodedToken.id : null
)

export const selectUserFirstName = createSelector(
  selectIsLoggedIn,
  selectDecodedToken,
  (isLoggedIn: boolean, decodedToken: DecodedToken) =>
    isLoggedIn ? decodedToken.firstName : null
)

export const selectUserLastName = createSelector(
  selectIsLoggedIn,
  selectDecodedToken,
  (isLoggedIn: boolean, decodedToken: DecodedToken) =>
    isLoggedIn ? decodedToken.lastName : null
)

export const selectUserEmail = createSelector(
  selectIsLoggedIn,
  selectDecodedToken,
  (isLoggedIn: boolean, decodedToken: DecodedToken) =>
    isLoggedIn ? decodedToken.email : null
)

export const selectUserDetails = createSelector(
  selectAuthFeature,
  (state: IAuthState) => state.user
)

// export const selectUserDetails = createSelector(
//   selectUserId,
//   selectUserFirstName,
//   selectUserLastName,
//   selectUserEmail,
//   (id, firstName, lastName, email) => ({
//     id, firstName, lastName, email
//   } as IUserDetails)
// )

// export interface IUserDetails {
//   id: string
//   firstName: string
//   lastName: string
//   email: string
// }

function isUserType(decodedToken: DecodedToken, userType: UserType): boolean {
  if (!decodedToken) {
    return false
  }

  return decodedToken.type == userType
}

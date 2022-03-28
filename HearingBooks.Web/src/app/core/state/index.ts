import { authFeatureKey, IAuthState } from "../auth/auth.reducer";

export interface IApplicationState {
  [authFeatureKey]: IAuthState
}
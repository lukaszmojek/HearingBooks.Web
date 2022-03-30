import * as auth from "src/app/auth/auth.reducer";

export interface IApplicationState {
  [auth.featureName]: auth.IAuthState
}
import * as auth from "src/app/auth/auth.reducer";
import * as preferences from "src/app/preferences/preferences.reducer";

export interface IApplicationState {
  [auth.featureName]: auth.IAuthState,
  [preferences.featureName]: preferences.IPreferencesState,
}
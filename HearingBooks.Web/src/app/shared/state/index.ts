import * as auth from 'src/app/auth/auth.reducer'
import * as preferences from 'src/app/preferences/preferences.reducer'
import * as ui from 'src/app/ui/ui.reducer'
import * as languages from 'src/app/languages/languages.reducer'

export interface IApplicationState {
  [ui.featureName]: ui.IUIState
  [auth.featureName]: auth.IAuthState
  [preferences.featureName]: preferences.IPreferencesState
  [languages.featureName]: languages.ILanguagesState
}

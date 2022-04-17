import { createFeature, createReducer, on } from '@ngrx/store'
import { PreferencesActions } from './preferences.actions'

export const featureName = 'preferences'

const initialState: IPreferencesState = {
  isAcrylicEnabled: true,
  language: 'en',
}

export interface IPreferencesState {
  isAcrylicEnabled: boolean
  language: string
}

const reducer = createReducer(
  initialState,
  on(
    PreferencesActions.isAcrylicEnabledToggled,
    (state, { isAcrylicEnabled }) => ({
      ...state,
      isAcrylicEnabled: isAcrylicEnabled,
    })
  ),
  on(PreferencesActions.languageChanged, (state, { language }) => ({
    ...state,
    language: language,
  }))
)

export const preferencesFeature = createFeature({
  name: featureName,
  reducer: reducer,
})

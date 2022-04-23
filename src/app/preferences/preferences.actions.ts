import { createAction, props } from '@ngrx/store'
import { IPreferencesState } from './preferences.reducer'

const isAcrylicEnabledToggled = createAction(
  '[Preferences] Acrylic toggled',
  props<{ isAcrylicEnabled: boolean }>()
)

const languageChanged = createAction(
  '[Preferences] Language changed',
  props<{ language: string }>()
)

const preferencesLoaded = createAction(
  '[Preferences] Preferences loaded',
  props<{ preferences: IPreferencesState }>()
)

export const PreferencesActions = {
  isAcrylicEnabledToggled,
  languageChanged,
  preferencesLoaded
}

import { createAction, props } from '@ngrx/store'

const isAcrylicEnabledToggled = createAction(
  '[Preferences] Acrylic toggled',
  props<{ isAcrylicEnabled: boolean }>()
)

const languageChanged = createAction(
  '[Preferences] Language changed',
  props<{ language: string }>()
)

export const PreferencesActions = {
  isAcrylicEnabledToggled,
  languageChanged,
}

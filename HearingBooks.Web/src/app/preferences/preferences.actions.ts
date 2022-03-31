import { createAction, props } from '@ngrx/store';

const isAcrylicEnabledToggled = createAction(
  '[Preferences] Acrylic toggled',
  props<{ isAcrylicEnabled: boolean; }>()
);

export const PreferencesActions = {
  isAcrylicEnabledToggled,
}

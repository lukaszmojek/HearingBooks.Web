import { createAction, props } from '@ngrx/store';

const updatePreferences = createAction(
  '[Preferences] Preference update requested',
  props<{ userId: string; }>()
);

export const PreferencesActions = {
  updatePreferences,
}

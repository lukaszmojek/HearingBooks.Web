import { createFeature, createReducer, on } from '@ngrx/store';
import { PreferencesActions } from './preferences.actions';

export const featureName = 'preferences'

const initialState: IPreferencesState = {
  acrylicEnabled: true
}

export interface IPreferencesState {
  acrylicEnabled: boolean
}

const reducer = createReducer(
  initialState,
  on(PreferencesActions.updatePreferences, (state) => ({
    ...state,
    isActionInProgress: true
  })),
)

export const preferencesFeature = createFeature({
  name: featureName,
  reducer: reducer
})
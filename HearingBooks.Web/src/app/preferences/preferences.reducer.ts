import { createFeature, createReducer, on } from '@ngrx/store';
import { PreferencesActions } from './preferences.actions';

export const featureName = 'preferences'

const initialState: IPreferencesState = {
  isAcrylicEnabled: true
}

export interface IPreferencesState {
  isAcrylicEnabled: boolean
}

const reducer = createReducer(
  initialState,
  on(PreferencesActions.isAcrylicEnabledToggled, (state, { isAcrylicEnabled: isAcrylicEnabled }) => ({
    ...state,
    isAcrylicEnabled: isAcrylicEnabled
  })),
)

export const preferencesFeature = createFeature({
  name: featureName,
  reducer: reducer
})
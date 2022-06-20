import { createFeatureSelector, createSelector } from '@ngrx/store'
import { CardType } from '../shared/card/card-type'
import { featureName, IPreferencesState } from './preferences.reducer'

export const selectPreferencesFeature =
  createFeatureSelector<IPreferencesState>(featureName)

export const selectIsAcrylicEnabled = createSelector(
  selectPreferencesFeature,
  state => state.isAcrylicEnabled
)

export const selectMainCardType = createSelector(selectPreferencesFeature, state =>
  state.isAcrylicEnabled ? CardType.Acrylic : CardType.Material
)

export const selectInnerCardType = createSelector(selectPreferencesFeature, state =>
  state.isAcrylicEnabled ? CardType.Transparent : CardType.Material
)

export const selectLanguage = createSelector(
  selectPreferencesFeature,
  state => state.language
)


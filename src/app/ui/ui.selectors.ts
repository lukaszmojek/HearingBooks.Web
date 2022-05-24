import { createFeatureSelector, createSelector } from '@ngrx/store'
import { featureName, IUIState } from './ui.reducer'

export const selectUIFeature = createFeatureSelector<IUIState>(featureName)

export const selectIsSideMenuOpened = createSelector(
  selectUIFeature,
  state => state.isSideMenuOpened
)

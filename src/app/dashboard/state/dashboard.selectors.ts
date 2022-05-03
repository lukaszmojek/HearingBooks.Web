import { createFeatureSelector, createSelector } from '@ngrx/store'
import { featureName, IDashboardState } from './dashboard.reducer'

export const selectDashboardFeature = createFeatureSelector<IDashboardState>(featureName)

export const selectSynthesesSummary = createSelector(
  selectDashboardFeature,
  (state: IDashboardState) => state.synthesesSummary
)

export const selectIsActionInProgress = createSelector(
  selectDashboardFeature,
  (state: IDashboardState) => state.isActionInProgress
)
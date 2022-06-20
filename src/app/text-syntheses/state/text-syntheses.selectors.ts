import { createFeatureSelector, createSelector } from '@ngrx/store'
import { featureName, ITextSynthesesState } from './text-syntheses.reducer'

export const selectTextSynthesesFeature = createFeatureSelector<ITextSynthesesState>(featureName)

export const selectTextSyntheses = createSelector(
  selectTextSynthesesFeature,
  (state: ITextSynthesesState) => state.textSyntheses
)

export const selectIsActionInProgress = createSelector(
  selectTextSynthesesFeature,
  (state: ITextSynthesesState) => state.isActionInProgress
)

export const selectShouldShowEmptyState = createSelector(
  selectTextSynthesesFeature,
  (state: ITextSynthesesState) => state.isActionInProgress === false && state.textSyntheses.length === 0
)
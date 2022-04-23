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
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { featureName, IDialogueSynthesesState } from './dialogue-syntheses.reducer'

export const selectTextSynthesesFeature = createFeatureSelector<IDialogueSynthesesState>(featureName)

export const selectTextSyntheses = createSelector(
  selectTextSynthesesFeature,
  (state: IDialogueSynthesesState) => state.dialogueSyntheses
)

export const selectIsActionInProgress = createSelector(
  selectTextSynthesesFeature,
  (state: IDialogueSynthesesState) => state.isActionInProgress
)

export const selectShouldShowEmptyState = createSelector(
  selectTextSynthesesFeature,
  (state: IDialogueSynthesesState) => state.isActionInProgress === false && state.dialogueSyntheses.length === 0
)
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { featureName, IDialogueSynthesesState } from './dialogue-syntheses.reducer'

export const selectDialogueSynthesesFeature = createFeatureSelector<IDialogueSynthesesState>(featureName)

export const selectDialogueSyntheses = createSelector(
  selectDialogueSynthesesFeature,
  (state: IDialogueSynthesesState) => state.dialogueSyntheses
)

export const selectIsActionInProgress = createSelector(
  selectDialogueSynthesesFeature,
  (state: IDialogueSynthesesState) => state.isActionInProgress
)

export const selectShouldShowEmptyState = createSelector(
  selectDialogueSynthesesFeature,
  (state: IDialogueSynthesesState) => state.isActionInProgress === false && state.dialogueSyntheses.length === 0
)
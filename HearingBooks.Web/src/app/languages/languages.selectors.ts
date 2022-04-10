import { createFeatureSelector, createSelector } from '@ngrx/store'
import { featureName, ILanguagesState } from './languages.reducer'

export const selectLanguagesFeature = createFeatureSelector<ILanguagesState>(featureName)

export const selectIsActionInProgress = createSelector(
  selectLanguagesFeature,
  (state: ILanguagesState) => state.isActionInProgress
)
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { featureName, ILanguagesState } from './languages.reducer'

export const selectLanguagesFeature = createFeatureSelector<ILanguagesState>(featureName)

export const selectLanguages = createSelector(
  selectLanguagesFeature,
  (state: ILanguagesState) => state.languages
)

export const selectIsActionInProgress = createSelector(
  selectLanguagesFeature,
  (state: ILanguagesState) => state.isActionInProgress
)

export const isLanguageSelected = createSelector(
  selectLanguagesFeature,
  (state: ILanguagesState) => state.selectedLanguage !== null
)

export const selectSelectedLanguage = createSelector(
  selectLanguagesFeature,
  (state: ILanguagesState) => state.selectedLanguage
)

export const selectVoicesFromSelectedLanguage = createSelector(
  selectLanguagesFeature,
  isLanguageSelected,
  (state: ILanguagesState, isLanguageSelected: boolean) => isLanguageSelected
    ? state.selectedLanguage!.voices
    : []
)
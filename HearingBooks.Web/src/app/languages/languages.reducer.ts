import { createFeature, createReducer, on } from '@ngrx/store'
import { LanguagesActions } from './languages.actions'
import { ISynthesisLanguage } from './models'

export const featureName = 'languages'

const initialState: ILanguagesState = {
  languages: [],
  isActionInProgress: false,
  selectedLanguage: null
}

export interface ILanguagesState {
  languages: ISynthesisLanguage[],
  isActionInProgress: boolean,
  selectedLanguage: ISynthesisLanguage | null
}

const reducer = createReducer(
  initialState,
  on(LanguagesActions.loadLangaugesWithVoices, state => ({
    ...state,
    isActionInProgress: true,
  })),
  on(LanguagesActions.loadLangaugesWithVoicesSucceded, (state, { languages }) => ({
    ...state,
    languages: languages,
    isActionInProgress: false,
  })),
  on(LanguagesActions.loadLangaugesWithVoicesFailed, state => ({
    ...state,
    isActionInProgress: false,
  })),
  on(LanguagesActions.languageSelected, (state, { language }) => ({
    ...state,
    selectedLanguage: language,
  })),
)

export const languagesFeature = createFeature({
  name: featureName,
  reducer: reducer,
})

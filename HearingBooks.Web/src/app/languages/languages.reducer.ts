import { createFeature, createReducer, on } from '@ngrx/store'
import { LanguagesActions } from './languages.actions'
import { ISynthesisLanguage } from './models'

export const featureName = 'languages'

const initialState: ILanguagesState = {
  languages: [],
  isActionInProgress: false
}

export interface ILanguagesState {
  languages: ISynthesisLanguage[],
  isActionInProgress: boolean
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
)

export const languagesFeature = createFeature({
  name: featureName,
  reducer: reducer,
})

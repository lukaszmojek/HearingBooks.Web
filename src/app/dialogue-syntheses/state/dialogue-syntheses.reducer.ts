import { createFeature, createReducer, on } from '@ngrx/store'
import { DialogueSynthesesActions } from './dialogue-syntheses.actions'
import { IDialogueSynthesis } from './models'

export const featureName = 'dialogue-syntheses'

const initialState: IDialogueSynthesesState = {
  dialogueSyntheses: [],
  isActionInProgress: false,
}

export interface IDialogueSynthesesState {
  dialogueSyntheses: IDialogueSynthesis[],
  isActionInProgress: boolean,
}

const reducer = createReducer(
  initialState,
  on(DialogueSynthesesActions.loadDialogueSynthesesForUser, state => ({
    ...state,
    isActionInProgress: true,
  })),
  on(DialogueSynthesesActions.loadDialogueSynthesesForUserSucceded, (state, { dialogueSyntheses }) => ({
    ...state,
    dialogueSyntheses: dialogueSyntheses,
    isActionInProgress: false,
  })),
  on(DialogueSynthesesActions.loadDialogueSynthesesForUserFailed, state => ({
    ...state,
    isActionInProgress: false,
  })),
  on(DialogueSynthesesActions.requestDialogueSynthesis, state => ({
    ...state,
    isActionInProgress: true,
  })),
  on(DialogueSynthesesActions.requestDialogueSynthesisSucceded, (state) => ({
    ...state,
    isActionInProgress: false,
  })),
  on(DialogueSynthesesActions.requestDialogueSynthesisFailed, state => ({
    ...state,
    isActionInProgress: false,
  })),
)

export const dialogueSynthesesFeature = createFeature({
  name: featureName,
  reducer: reducer,
})

import { createFeature, createReducer, on } from '@ngrx/store'
import { TextSynthesesActions } from './text-syntheses.actions'
import { ITextSynthesis } from './models'

export const featureName = 'text-syntheses'

const initialState: ITextSynthesesState = {
  textSyntheses: [],
  isActionInProgress: false,
}

export interface ITextSynthesesState {
  textSyntheses: ITextSynthesis[],
  isActionInProgress: boolean,
}

const reducer = createReducer(
  initialState,
  on(TextSynthesesActions.loadTextSynthesesForUser, state => ({
    ...state,
    isActionInProgress: true,
  })),
  on(TextSynthesesActions.loadTextSynthesesForUserSucceded, (state, { textSyntheses }) => ({
    ...state,
    textSyntheses: textSyntheses,
    isActionInProgress: false,
  })),
  on(TextSynthesesActions.loadTextSynthesesForUserFailed, state => ({
    ...state,
    isActionInProgress: false,
  })),
  on(TextSynthesesActions.requestTextSynthesis, state => ({
    ...state,
    isActionInProgress: true,
  })),
  on(TextSynthesesActions.requestTextSynthesisSucceded, (state) => ({
    ...state,
    isActionInProgress: false,
  })),
  on(TextSynthesesActions.requestTextSynthesisFailed, state => ({
    ...state,
    isActionInProgress: false,
  })),
  on(TextSynthesesActions.textSynthesisUpdated, (state, { textSynthesis }) => {
    const synthesisInStoreIndex = state.textSyntheses.findIndex(s => s.id === textSynthesis.id)
    
    if (synthesisInStoreIndex !== -1) {
      const updatedTextSyntheses = state.textSyntheses
      updatedTextSyntheses[synthesisInStoreIndex] = textSynthesis
      
      return {
        ...state,
        updatedTextSyntheses
      }
    }

    return {
      ...state,
      textSyntheses: state.textSyntheses.concat([textSynthesis])
    }
  }),
)

export const textSynthesesFeature = createFeature({
  name: featureName,
  reducer: reducer,
})

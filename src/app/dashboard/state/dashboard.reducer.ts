import { createFeature, createReducer, on } from '@ngrx/store'
import { DashboardActions } from './dashboard.actions'
import { ISynthesesSummary } from './models'

export const featureName = 'dashboard'

const initialState: IDashboardState = {
  synthesesSummary: null,
  isActionInProgress: false,
}

export interface IDashboardState {
  synthesesSummary: ISynthesesSummary | null,
  isActionInProgress: boolean,
}

const reducer = createReducer(
  initialState,
  on(DashboardActions.loadSynthesesSummaryForUser, state => ({
    ...state,
    isActionInProgress: true,
  })),
  on(DashboardActions.loadSynthesesSummaryForUserSucceded, (state, { synthesesSummary: synthesesSummary }) => ({
    ...state,
    synthesesSummary: synthesesSummary,
    isActionInProgress: false,
  })),
  on(DashboardActions.loadSynthesesSummaryForUserFailed, state => ({
    ...state,
    isActionInProgress: false,
  })),
)

export const dashboardFeature = createFeature({
  name: featureName,
  reducer: reducer
})

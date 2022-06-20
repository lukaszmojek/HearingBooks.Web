import { createAction, props } from '@ngrx/store'
import { ISynthesesSummary } from './models'

const loadSynthesesSummaryForUser = createAction(
  '[Dashboard] Load Syntheses Summary for user',
  props<{ userId: string }>()
)

const loadSynthesesSummaryForUserSucceded = createAction(
  '[Dashboard] Load Syntheses Summary for user SUCCEDED',
  props<{ synthesesSummary: ISynthesesSummary }>()
)

const loadSynthesesSummaryForUserFailed = createAction(
  '[Dashboard] Load Syntheses Summary for user FAILED'
)

export const DashboardActions = {
  loadSynthesesSummaryForUser,
  loadSynthesesSummaryForUserSucceded,
  loadSynthesesSummaryForUserFailed,
}

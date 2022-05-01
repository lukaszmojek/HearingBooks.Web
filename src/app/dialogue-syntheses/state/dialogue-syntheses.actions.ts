import { createAction, props } from '@ngrx/store'
import { IDialogueSynthesis, IDialogueSynthesisRequest } from './models'

const loadDialogueSynthesesForUser = createAction(
  '[Dialogue Syntheses] Load DialogueSyntheses for user'
)

const loadDialogueSynthesesForUserSucceded = createAction(
  '[Dialogue Syntheses] Load DialogueSyntheses for user SUCCEDED',
  props<{ dialogueSyntheses: IDialogueSynthesis[] }>()
)

const loadDialogueSynthesesForUserFailed = createAction(
  '[Dialogue Syntheses] Load DialogueSyntheses for user FAILED'
)

const requestDialogueSynthesis = createAction(
  '[Dialogue Syntheses] Request TextSynthesis',
  props<{ dialogueSynthesisRequest: IDialogueSynthesisRequest }>()
)

const requestDialogueSynthesisSucceded = createAction(
  '[Dialogue Syntheses] Request TextSynthesis SUCCEDED',
)

const requestDialogueSynthesisFailed = createAction(
  '[Dialogue Syntheses] Request TextSynthesis FAILED'
)

export const DialogueSynthesesActions = {
  loadDialogueSynthesesForUser,
  loadDialogueSynthesesForUserSucceded,
  loadDialogueSynthesesForUserFailed,
  requestDialogueSynthesis,
  requestDialogueSynthesisSucceded,
  requestDialogueSynthesisFailed,
}

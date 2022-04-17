import { createAction, props } from '@ngrx/store'
import { ITextSynthesis, ITextSynthesisRequest } from './models'

const loadTextSynthesesForUser = createAction(
  '[Text Syntheses] Load TextSyntheses for user'
)

const loadTextSynthesesForUserSucceded = createAction(
  '[Text Syntheses] Load TextSyntheses for user SUCCEDED',
  props<{ textSyntheses: ITextSynthesis[] }>()
)

const loadTextSynthesesForUserFailed = createAction(
  '[Text Syntheses] Load TextSyntheses for user FAILED'
)

const requestTextSynthesis = createAction(
  '[Text Syntheses] Request TextSynthesis',
  props<{ textSynthesisRequest: ITextSynthesisRequest }>()
)

const requestTextSynthesisSucceded = createAction(
  '[Text Syntheses] Request TextSynthesis SUCCEDED',
)

const requestTextSynthesisFailed = createAction(
  '[Text Syntheses] Request TextSynthesis FAILED'
)

export const TextSynthesesActions = {
  loadTextSynthesesForUser,
  loadTextSynthesesForUserSucceded,
  loadTextSynthesesForUserFailed,
  requestTextSynthesis,
  requestTextSynthesisSucceded,
  requestTextSynthesisFailed,
}

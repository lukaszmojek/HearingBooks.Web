import { createAction, props } from '@ngrx/store'
import { ISynthesisLanguage } from './models'

const loadLangaugesWithVoices = createAction(
  '[Langauges] Load languages with voices'
)

const loadLangaugesWithVoicesSucceded = createAction(
  '[Langauges] Load languages with voices SUCCEDED',
  props<{ languages: ISynthesisLanguage[] }>()
)

const loadLangaugesWithVoicesFailed = createAction(
  '[Langauges] Load languages with voices FAILED'
)

export const LanguagesActions = {
  loadLangaugesWithVoices,
  loadLangaugesWithVoicesSucceded,
  loadLangaugesWithVoicesFailed
}

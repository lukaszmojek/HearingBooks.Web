import { Injectable } from '@angular/core'
import { LanguagesService } from './languages.service'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { LanguagesActions } from './languages.actions'
import { exhaustMap, catchError, map } from 'rxjs/operators'
import { of } from 'rxjs'

@Injectable()
export class LanguagesEffects {
  loadLanguagesWithVoices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LanguagesActions.loadLangaugesWithVoices),
      exhaustMap(action =>
        this.languagesService.getLanguagesWithVoices$().pipe(
          map(response =>
            LanguagesActions.loadLangaugesWithVoicesSucceded({ languages: response })
          ),
          catchError(_ => of(LanguagesActions.loadLangaugesWithVoicesFailed()))
        )
      )
    )
  )

  constructor(
    private actions$: Actions,
    private languagesService: LanguagesService,
  ) { }
}

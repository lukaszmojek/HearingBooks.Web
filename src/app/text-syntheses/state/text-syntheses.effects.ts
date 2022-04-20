import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { TextSynthesesActions } from './text-syntheses.actions'
import { exhaustMap, catchError, map } from 'rxjs/operators'
import { of } from 'rxjs'
import { TextSynthesisService } from './text-synthesis.service'
import { Router } from '@angular/router'

@Injectable()
export class TextSynthesesEffects {
  loadTextSynthesesForUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TextSynthesesActions.loadTextSynthesesForUser),
      exhaustMap(action =>
        this.textSynthesisService.getTextSynthesesForUser$().pipe(
          map(response =>
            TextSynthesesActions.loadTextSynthesesForUserSucceded({ textSyntheses: response })
          ),
          catchError(_ => of(TextSynthesesActions.loadTextSynthesesForUserFailed()))
        )
      )
    )
  )

  requestTextSynthesis$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TextSynthesesActions.requestTextSynthesis),
      exhaustMap(action =>
        this.textSynthesisService.requestTextSynthesis$(action.textSynthesisRequest).pipe(
          map(response => {
            this.router.navigate(['text-syntheses'])
            return TextSynthesesActions.requestTextSynthesisSucceded()
          }),
          catchError(_ => {
            return of(TextSynthesesActions.requestTextSynthesisFailed())
          })
        )
      )
    )
  )

  constructor(
    private actions$: Actions,
    private textSynthesisService: TextSynthesisService,
    private router: Router
  ) { }
}

import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { TextSynthesesActions } from './text-syntheses.actions'
import { exhaustMap, catchError, map } from 'rxjs/operators'
import { combineLatest, } from 'rxjs'
import { TextSynthesisService } from './text-synthesis.service'
import { SnackbarNotificationsService } from 'src/app/shared/notifications/snackbar-notifications.service'
import { Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import { HttpErrorResponse } from '@angular/common/http'

@Injectable()
export class TextSynthesesEffects {
  loadTextSynthesesForUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TextSynthesesActions.loadTextSynthesesForUser),
      exhaustMap(_ =>
        this.textSynthesisService.getTextSynthesesForUser$().pipe(
          map(response =>
            TextSynthesesActions.loadTextSynthesesForUserSucceded({ textSyntheses: response })
          ),
          catchError((httpError: HttpErrorResponse) =>
            this.translate.get('Notifications.TextSyntheses.LoadError').pipe(
              map(errorMessage => {
                if (!httpError.message.includes('404')) {
                  this.notifications.showErrorNotification(errorMessage)
                }

                return TextSynthesesActions.loadTextSynthesesForUserFailed()
              })
            )
          )
        )
      )
    )
  )

  requestTextSynthesis$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TextSynthesesActions.requestTextSynthesis),
      exhaustMap(action =>
        combineLatest([
          this.textSynthesisService.requestTextSynthesis$(action.textSynthesisRequest),
          this.translate.get('Notifications.TextSyntheses.Request.Success')
        ])
          .pipe(
            map(([_, successMessage]) => {
              this.notifications.showNotification(successMessage)
              this.router.navigate(['text-syntheses'])
              return TextSynthesesActions.requestTextSynthesisSucceded()
            }),
            catchError(_ =>
              this.translate.get('Notifications.TextSyntheses.Request.Error').pipe(
                map(errorMessage => {
                  this.notifications.showErrorNotification(errorMessage)
                  return TextSynthesesActions.requestTextSynthesisFailed()
                })
              )
            )
          )
      )
    )
  )

  constructor(
    private actions$: Actions,
    private textSynthesisService: TextSynthesisService,
    private notifications: SnackbarNotificationsService,
    private router: Router,
    private translate: TranslateService
  ) { }
}

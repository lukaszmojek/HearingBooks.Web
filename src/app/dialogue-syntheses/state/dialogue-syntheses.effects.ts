import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { SnackbarNotificationsService } from 'src/app/shared/notifications/snackbar-notifications.service'
import { Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import { HttpErrorResponse } from '@angular/common/http'
import { DialogueSynthesisService } from './dialogue-syntheses.service'
import { DialogueSynthesesActions } from './dialogue-syntheses.actions'
import { exhaustMap, map, catchError, combineLatest } from 'rxjs'

@Injectable()
export class DialogueSynthesesEffects {
  loadDialogueSynthesesForUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DialogueSynthesesActions.loadDialogueSynthesesForUser),
      exhaustMap(_ =>
        this.dialogueSynthesisService.getDialogueSynthesesForUser$().pipe(
          map(response =>
            DialogueSynthesesActions.loadDialogueSynthesesForUserSucceded({ dialogueSyntheses: response })
          ),
          catchError((httpError: HttpErrorResponse) =>
            this.translate.get('Notifications.DialogueSyntheses.LoadError').pipe(
              map(errorMessage => {
                if (!httpError.message.includes('404')) {
                  this.notifications.showErrorNotification(errorMessage)
                }

                return DialogueSynthesesActions.loadDialogueSynthesesForUserFailed()
              })
            )
          )
        )
      )
    )
  )

  requestDialogueSynthesis$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DialogueSynthesesActions.requestDialogueSynthesis),
      exhaustMap(action =>
        combineLatest([
          this.dialogueSynthesisService.requestDialogueSynthesis$(action.dialogueSynthesisRequest),
          this.translate.get('Notifications.DialogueSyntheses.Request.Success')
        ])
          .pipe(
            map(([_, successMessage]) => {
              this.notifications.showNotification(successMessage)
              this.router.navigate(['dialogue-syntheses'])
              return DialogueSynthesesActions.requestDialogueSynthesisSucceded()
            }),
            catchError(_ =>
              this.translate.get('Notifications.DialogueSyntheses.Request.Error').pipe(
                map(errorMessage => {
                  this.notifications.showErrorNotification(errorMessage)
                  return DialogueSynthesesActions.requestDialogueSynthesisFailed()
                })
              )
            )
          )
      )
    )
  )

  constructor(
    private actions$: Actions,
    private dialogueSynthesisService: DialogueSynthesisService,
    private notifications: SnackbarNotificationsService,
    private router: Router,
    private translate: TranslateService
  ) { }
}

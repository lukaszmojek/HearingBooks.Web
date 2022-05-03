import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { SnackbarNotificationsService } from 'src/app/shared/notifications/snackbar-notifications.service'
import { Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import { HttpErrorResponse } from '@angular/common/http'
import { DashboardService } from './dashboard.service'
import { DashboardActions } from './dashboard.actions'
import { exhaustMap, map, catchError } from 'rxjs'

@Injectable()
export class DashboardEffects {
  loadSynthesesSummaryForUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.loadSynthesesSummaryForUser),
      exhaustMap(action =>
        this.dashboard.getSynthesesSummaryForUser$(action.userId).pipe(
          map(response =>
            DashboardActions.loadSynthesesSummaryForUserSucceded({ synthesesSummary: response })
          ),
          catchError((httpError: HttpErrorResponse) =>
            this.translate.get('Notifications.Dashboard.LoadError').pipe(
              map(errorMessage => {
                return DashboardActions.loadSynthesesSummaryForUserFailed()
              })
            )
          )
        )
      )
    )
  )

  constructor(
    private actions$: Actions,
    private dashboard: DashboardService,
    private notifications: SnackbarNotificationsService,
    private router: Router,
    private translate: TranslateService
  ) { }
}

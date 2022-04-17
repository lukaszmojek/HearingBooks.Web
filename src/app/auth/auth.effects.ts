import { Injectable } from '@angular/core'
import { AuthenticationService } from './authentication.service'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { AuthActions } from './auth.actions'
import { exhaustMap, catchError, map, tap } from 'rxjs/operators'
import { of } from 'rxjs'
import { Router } from '@angular/router'

@Injectable()
export class AuthEffects {
  logIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logIn),
      exhaustMap(action =>
        this.auth.logIn$(action.email, action.password).pipe(
          map(response =>
            AuthActions.logInSuccess({ token: response.content.token })
          ),
          tap(_ => {
            this.router.navigateByUrl('dashboard')
          }),
          catchError(_ => of(AuthActions.logInFailed()))
        )
      )
    )
  )

  logOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logOut),
      exhaustMap(_ =>
        this.auth.logOut$().pipe(
          map(_ => AuthActions.logOutSuccess()),
          tap(_ => {
            this.router.navigateByUrl('login')
          }),
          catchError(_ => of(AuthActions.logOutFailed()))
        )
      )
    )
  )

  constructor(
    private actions$: Actions,
    private auth: AuthenticationService,
    private router: Router
  ) {}
}

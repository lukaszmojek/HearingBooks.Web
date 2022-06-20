import { Injectable } from '@angular/core'
import { AuthenticationService } from './authentication.service'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { AuthActions } from './auth.actions'
import { exhaustMap, catchError, map, tap } from 'rxjs/operators'
import { of } from 'rxjs'
import { Router } from '@angular/router'
import { IApplicationState } from '../shared/state'
import { Store } from '@ngrx/store'

@Injectable()
export class AuthEffects {
  logIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logIn),
      exhaustMap(action =>
        this.auth.logIn$(action.email, action.password).pipe(
          map(response => {
            this.router.navigateByUrl('text-syntheses')
            return AuthActions.logInSuccess({ token: response.token })
          }),
          catchError(error => {
            console.log(error)
            return of(AuthActions.logInFailed())
          })
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

  loadUserDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadUserDetails),
      exhaustMap(_ =>
        this.auth.loadUserDetails$().pipe(
          map(userDetails => AuthActions.loadUserDetailsSuccess({ userDetails: userDetails })),
          catchError(_ => of(AuthActions.loadUserDetailsFailed()))
        )
      )
    )
  )

  constructor(
    private actions$: Actions,
    private auth: AuthenticationService,
    private router: Router,
    private store$: Store<IApplicationState>,
  ) { }
}

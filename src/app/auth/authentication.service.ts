import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable, of } from 'rxjs'
import { tap } from 'rxjs/operators'
import { ApiEndpoints } from '../shared/api-endpoints'
import { IUIState } from '../ui/ui.reducer'
import { AuthActions } from './auth.actions'
import { IAuthState } from './auth.reducer'
import { IApiResponse, ITokenResponse, IUser } from './models'

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly localStorageTokenKey = 'hb_token_key'

  private get tokenEntryExistsInLocalStorage(): boolean {
    return !!this.tokenFromLocalStorage
  }

  private get tokenFromLocalStorage(): string | null {
    return localStorage.getItem(this.localStorageTokenKey)
  }

  constructor(
    private store$: Store<{ auth: IAuthState }>,
    private http: HttpClient
  ) {
    if (this.tokenEntryExistsInLocalStorage) {
      this.store$.dispatch(
        AuthActions.logInSuccess({ token: this.tokenFromLocalStorage! })
      )
    }
  }

  public logIn$(
    email: string,
    password: string
  ): Observable<ITokenResponse> {
    const request = {
      email: email,
      password: password,
    }

    return this.http
      .post<ITokenResponse>(ApiEndpoints.auth.login, request)
      .pipe(
        tap(tokenResponse => {
          localStorage.setItem(
            this.localStorageTokenKey,
            tokenResponse.token
          )
        })
      )
  }

  public logOut$(): Observable<any> {
    localStorage.removeItem(this.localStorageTokenKey)

    return of('')
  }

  public loadUserDetails$(): Observable<any> {
    return this.http
      .get<IUser>(ApiEndpoints.users.details)
  }
}

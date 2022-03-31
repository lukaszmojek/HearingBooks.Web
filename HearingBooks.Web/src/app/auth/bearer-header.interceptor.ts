export interface Auth {
}
import { Injectable } from '@angular/core'
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HttpErrorResponse, HttpStatusCode, HttpResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { Store } from '@ngrx/store'
import { AuthActions } from './auth.actions'
import { selectToken } from './auth.selectors'
import { IAuthState } from './auth.reducer'
import StoreConnectedComponent from '../shared/store-connected.component'

@Injectable()
export class BearerHeaderInterceptor extends StoreConnectedComponent<IAuthState>
implements HttpInterceptor {
  private token: string = ''

  constructor(
    store$: Store<IAuthState>,
  ) {
    super(store$)
    this.safeSelect$(selectToken).subscribe(token => {
      this.token = token
    })
  }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.token) {
      return next.handle(httpRequest)
    }

    const bearerToken = `Bearer ${this.token}`

    return next.handle(
      httpRequest.clone({ 
        setHeaders: {
          "Authorization": bearerToken
        } 
      })
    ).pipe(
      catchError((error: HttpErrorResponse) => {
        // this.snackBar.displaySnackbar(`Błąd - Status ${error.status}: ${this.mapHttpStatusCode(error.status)}`)
        let errorMsg = ''

        if (error.error instanceof ErrorEvent) {
          console.log('This is client side error')
          errorMsg = `Error: ${error.error.message}`
        } else {
          console.log('This is server side error')
          if (error.status === HttpStatusCode.Unauthorized) {
            this.store$.dispatch(AuthActions.logOut())
          }
          errorMsg = `Error Code: ${error.status},  Message: ${error.message}`
        }

        console.log(errorMsg)
        return throwError(() => new Error(errorMsg))
      })
    )
  }

  private mapHttpStatusCode(code: HttpStatusCode): string {
    switch (code as number) {
      case HttpStatusCode.Unauthorized: return 'Brak uprawnień'
      case HttpStatusCode.BadRequest: return 'Zapytanie nie mogło zostac wykonane z powodu złych danych'
      case HttpStatusCode.NotFound: return 'Nie znaleziono'
      case 0: return 'Brak połączania z API'
      default: return 'Nieznany błąd'
    }
  }
}
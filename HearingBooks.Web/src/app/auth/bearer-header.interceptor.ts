export interface Auth {
}
import { Injectable } from '@angular/core'
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HttpErrorResponse, HttpStatusCode, HttpResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { AuthorizationService } from './authorization.service'
import { catchError } from 'rxjs/operators'
import { Store } from '@ngrx/store'
import { IAuthState } from './auth.reducer'
import { AuthActions } from './auth.actions'

@Injectable()
export class BearerHeaderInterceptor implements HttpInterceptor {
  constructor(
    private authorizationService: AuthorizationService, 
    private store$: Store<{auth: IAuthState}>,
    // private snackBar: SnackbarService
  ) {}

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authorizationService.rawToken

    if (!token) {
      return next.handle(httpRequest)
    }

    const bearerToken = `Bearer ${token}`

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
        return throwError(errorMsg)
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
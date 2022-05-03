export interface Auth { }
import { Injectable } from '@angular/core'
import {
  HttpInterceptor,
  HttpEvent,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http'
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store'
import { selectToken } from './auth.selectors'
import { IAuthState } from './auth.reducer'
import StoreConnectedComponent from '../shared/store-connected.component'

@Injectable()
export class BearerHeaderInterceptor
  extends StoreConnectedComponent<IAuthState>
  implements HttpInterceptor {
  private token: string = ''

  constructor(store$: Store<IAuthState>) {
    super(store$)
    this.safeSelect$(selectToken).subscribe(token => {
      this.token = token
    })
  }

  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.token) {
      return next.handle(httpRequest)
    }

    const bearerToken = `Bearer ${this.token}`

    return next
      .handle(
        httpRequest.clone({
          setHeaders: {
            Authorization: bearerToken,
          },
        })
      )
  }
}

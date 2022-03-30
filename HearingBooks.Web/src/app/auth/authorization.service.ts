import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAuthState } from './auth.reducer';
import { selectToken } from './auth.selectors';
import jwtDecode from "jwt-decode";
import { DecodedToken } from './decoded-token';
import { UserType } from '../core/users/models';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private _rawToken: string = ''
  private _decodedToken!: DecodedToken;

  public get rawToken(): string {
    return this._rawToken
  }

  public get isAuthorized(): boolean {
    return !!this._rawToken
  }

  constructor(private store$: Store<{auth: IAuthState}>) {
    this.store$.select(selectToken).subscribe(token => {
      this._rawToken = token

      if (!token) {
        return
      }

      this._decodedToken = jwtDecode<DecodedToken>(token)
    })
  }

  public isPayAsYouGo(): boolean {
    return this.isUserType(UserType.PayAsYouGo)
  }

  public isSubscriber(): boolean {
    return this.isUserType(UserType.Subscriber)
  }

  public isWriter(): boolean {
    return this.isUserType(UserType.Writer)
  }

  public isHearingBooks(): boolean {
    return this.isUserType(UserType.HearingBooks)
  }

  private isUserType(userType: UserType): boolean {
    if (!this._decodedToken) {
      return false
    }

    return this._decodedToken.type == userType;
  }

  public currentUserId(): number {
    if (!this._decodedToken) {
      return 0
    }

    return this._decodedToken.id
  }

  public currentUserName(): string {
    if (!this._decodedToken) {
      return ''
    }

    return this._decodedToken.name
  }
}

import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthActions } from 'src/app/auth/auth.actions';
import { IAuthState } from 'src/app/auth/auth.reducer';
import { AuthorizationService } from 'src/app/auth/authorization.service';
import StoreConnectedComponent from '../store-connected.component';

@Component({
  selector: 'hb-logged-user',
  templateUrl: './logged-user.component.html',
  styleUrls: ['./logged-user.component.sass']
})
export class LoggedUserComponent extends StoreConnectedComponent<IAuthState> {
  public get loggedUserName(): string {
    return this.auth.currentUserName()
  }

  constructor(store: Store<IAuthState>, private auth: AuthorizationService) {
    super(store)
  }

  public logOut(): void {
    this.store$.dispatch(AuthActions.logOut())
  }
}

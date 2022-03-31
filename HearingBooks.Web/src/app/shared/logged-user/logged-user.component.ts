import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthActions } from 'src/app/auth/auth.actions';
import { selectUserName } from 'src/app/auth/auth.selectors';
import { IApplicationState } from '../state';
import StoreConnectedComponent from '../store-connected.component';

@Component({
  selector: 'hb-logged-user',
  templateUrl: './logged-user.component.html',
  styleUrls: ['./logged-user.component.sass']
})
export class LoggedUserComponent extends StoreConnectedComponent<IApplicationState> {
  public loggedUserName$ = this.store$.select(selectUserName)

  public get shouldDisplayCredits(): boolean {
    return false
  }

  constructor(store: Store<IApplicationState>) {
    super(store)
  }

  public logOut(): void {
    this.store$.dispatch(AuthActions.logOut())
  }
}

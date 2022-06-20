import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { AuthActions } from 'src/app/auth/auth.actions'
import { selectUserDetails, selectUserFirstName } from 'src/app/auth/auth.selectors'
import { UIActions } from 'src/app/ui/ui.actions'
import { IApplicationState } from '../state'
import StoreConnectedComponent from '../store-connected.component'

@Component({
  selector: 'hb-logged-user',
  templateUrl: './logged-user.component.html',
  styleUrls: ['./logged-user.component.scss'],
})
export class LoggedUserComponent extends StoreConnectedComponent<IApplicationState> {
  public loggedUserName$ = this.safeSelect$(selectUserFirstName)
  public userDetails$ = this.safeSelect$(selectUserDetails)

  public get shouldDisplayCredits(): boolean {
    return false
  }

  constructor(store: Store<IApplicationState>) {
    super(store)
  }

  public logOut(): void {
    this.store$.dispatch(UIActions.toggleSideMenu({ isSideMenuOpened: false }))
    this.store$.dispatch(AuthActions.logOut())
  }
}

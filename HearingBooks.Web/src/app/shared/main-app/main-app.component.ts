import { Component, ViewChild } from '@angular/core'
import { MatDrawer } from '@angular/material/sidenav'
import { Store } from '@ngrx/store'
import { selectIsLoggedIn } from 'src/app/auth/auth.selectors'
import { UIActions } from 'src/app/ui/ui.actions'
import { selectIsSideMenuOpened } from 'src/app/ui/ui.selectors'
import { IApplicationState } from '../state'
import StoreConnectedComponent from '../store-connected.component'

@Component({
  selector: 'hb-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.scss'],
})
export class MainAppComponent extends StoreConnectedComponent<IApplicationState> {
  @ViewChild('drawer')
  public drawer!: MatDrawer
  
  public isLoggedIn: boolean = true
  public isSideMenuOpened: boolean = false

  constructor(store$: Store<IApplicationState>) {
    super(store$)
    this.safeSelectAndSave$(selectIsLoggedIn, this.isLoggedIn)
    this.safeSelectAndSave$(selectIsSideMenuOpened, this.isSideMenuOpened)
  }

  public toggleSideMenu(): void {
    this.drawer?.toggle()
    this.store$.dispatch(UIActions.toggleSideMenu({isSideMenuOpened: this.drawer.opened}))
  }
}

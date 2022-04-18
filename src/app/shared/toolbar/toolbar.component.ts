import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { selectIsLoggedIn } from 'src/app/auth/auth.selectors'
import { UIActions } from 'src/app/ui/ui.actions'
import { selectIsSideMenuOpened } from 'src/app/ui/ui.selectors'
import AcrylicAwareComponent from '../acrylic/acrylic-aware.component'
import { AcrylicService } from '../acrylic/acrylic.service'
import { IApplicationState } from '../state'
import { ToolbarService } from './toolbar.service'

@Component({
  selector: 'hb-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent extends AcrylicAwareComponent<IApplicationState> {
  public isLoggedIn: boolean
  public isSideMenuOpened: boolean

  constructor(
    store$: Store<IApplicationState>,
    acrylicService: AcrylicService,
    private toolbar: ToolbarService
  ) {
    super(store$, acrylicService)
    this.safeSelect$(selectIsLoggedIn).subscribe(x => (this.isLoggedIn = x))
    this.safeSelect$(selectIsSideMenuOpened).subscribe(
      x => (this.isSideMenuOpened = x)
    )
  }

  public toggleSideMenu(): void {
    const isSideMenuOpened = this.toolbar.toggleDrawer()
    this.store$.dispatch(
      UIActions.toggleSideMenu({ isSideMenuOpened: isSideMenuOpened })
    )
  }
}

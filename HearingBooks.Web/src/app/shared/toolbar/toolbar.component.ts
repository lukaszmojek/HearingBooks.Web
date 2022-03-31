import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn } from 'src/app/auth/auth.selectors';
import { UIActions } from 'src/app/ui/ui.actions';
import { selectIsSideMenuOpened } from 'src/app/ui/ui.selectors';
import { IApplicationState } from '../state';
import StoreConnectedComponent from '../store-connected.component';
import { ToolbarService } from './toolbar.service';

@Component({
  selector: 'hb-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent extends StoreConnectedComponent<IApplicationState> { 
  public isLoggedIn: boolean = true
  public isSideMenuOpened: boolean = false

  constructor(store$: Store<IApplicationState>, private toolbar: ToolbarService) {
    super(store$)
    this.safeSelectAndSave$(selectIsLoggedIn, this.isLoggedIn)
    this.safeSelectAndSave$(selectIsSideMenuOpened, this.isSideMenuOpened)
  }

  public toggleSideMenu(): void {
    const isSideMenuOpened = this.toolbar.toggleDrawer()
    this.store$.dispatch(UIActions.toggleSideMenu({isSideMenuOpened: isSideMenuOpened}))
  }
}

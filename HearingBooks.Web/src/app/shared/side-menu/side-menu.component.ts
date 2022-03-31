import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { IAuthState } from 'src/app/auth/auth.reducer'
import StoreConnectedComponent from '../store-connected.component'
import { MenuItem } from './menu-item.interface'

@Component({
  selector: 'hb-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent extends StoreConnectedComponent<IAuthState> {
  public menuItems: MenuItem[] = [
    {
      name: 'Dashboard',
      routerLink: 'dashboard',
      shouldBeAvailable: () => true
    }
  ]

  constructor(store$: Store<IAuthState>) {
    super(store$)
  }
}

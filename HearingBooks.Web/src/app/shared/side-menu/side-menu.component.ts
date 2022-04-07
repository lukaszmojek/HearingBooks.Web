import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { IAuthState } from 'src/app/auth/auth.reducer'
import StoreConnectedComponent from '../store-connected.component'
import { MenuItem } from './menu-item.interface'

@Component({
  selector: 'hb-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuComponent extends StoreConnectedComponent<IAuthState> {
  // TODO: Make selected menu item filled in, while unselected will stay as outlined
  public menuItems: MenuItem[] = [
    {
      translationKey: 'SideMenu.Profile',
      routerLink: 'profile',
      shouldBeAvailable: () => true,
    },
    {
      translationKey: 'SideMenu.Dashboard',
      routerLink: 'dashboard',
      shouldBeAvailable: () => true,
    },
    {
      translationKey: 'SideMenu.TextSyntheses',
      routerLink: 'text-syntheses',
      shouldBeAvailable: () => true,
    },
    {
      translationKey: 'SideMenu.RequestTextSynthesis',
      routerLink: 'request-text-syntheses',
      shouldBeAvailable: () => true,
    },
  ]

  constructor(store$: Store<IAuthState>) {
    super(store$)
  }
}

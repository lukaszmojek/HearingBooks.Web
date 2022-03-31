import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { selectIsSideMenuOpened } from 'src/app/ui/ui.selectors'
import { IApplicationState } from '../state'
import StoreConnectedComponent from '../store-connected.component'
import { MenuItem } from './menu-item.interface'

@Component({
  selector: 'hb-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent extends StoreConnectedComponent<IApplicationState> {
  public isSideMenuOpened: boolean = false

  public menuItems: MenuItem[] = [
    {
      name: 'Dashboard',
      routerLink: 'dashboard',
      shouldBeAvailable: () => true
    }
  ]

  constructor(store$: Store<IApplicationState>) {
    super(store$)
    this.safeSelect$(selectIsSideMenuOpened).subscribe(value => console.log(value))
  }
}

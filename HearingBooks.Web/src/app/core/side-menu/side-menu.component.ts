import { Component } from '@angular/core'
import { MenuItem } from './menu-item.interface'

@Component({
  selector: 'hb-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent {
  public menuItems: MenuItem[] = [
    {
      name: 'Dashboard',
      routerLink: 'dashboard',
      shouldBeAvailable: () => true
    }
  ]

  constructor() {}
}

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import { MatDrawer } from '@angular/material/sidenav'
import { Store } from '@ngrx/store'
import { selectIsLoggedIn } from 'src/app/auth/auth.selectors'
import { selectIsSideMenuOpened } from 'src/app/ui/ui.selectors'
import { IApplicationState } from '../state'
import StoreConnectedComponent from '../store-connected.component'
import { ToolbarService } from '../toolbar/toolbar.service'

@Component({
  selector: 'hb-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.scss'],
})
export class MainAppComponent extends StoreConnectedComponent<IApplicationState> implements AfterViewInit {
  @ViewChild('drawer')
  public drawer!: MatDrawer
  
  public isLoggedIn: boolean = true
  public isSideMenuOpened: boolean = false

  constructor(store$: Store<IApplicationState>, private toolbar: ToolbarService) {
    super(store$)
    this.safeSelectAndSave$(selectIsLoggedIn, this.isLoggedIn)
    this.safeSelectAndSave$(selectIsSideMenuOpened, this.isSideMenuOpened)
  }
  
  ngAfterViewInit(): void {
    this.toolbar.setDrawer(this.drawer)

  }
}

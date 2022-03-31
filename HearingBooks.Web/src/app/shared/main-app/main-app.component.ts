import { AfterViewInit, Component, ViewChild } from '@angular/core'
import { MatDrawer } from '@angular/material/sidenav'
import { Store } from '@ngrx/store'
import { IPreferencesState } from 'src/app/preferences/preferences.reducer'
import { selectIsAcrylicEnabled, selectMainCardType } from 'src/app/preferences/preferences.selectors'
import StoreConnectedComponent from '../store-connected.component'
import { ToolbarService } from '../toolbar/toolbar.service'

@Component({
  selector: 'hb-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.scss'],
})
export class MainAppComponent extends StoreConnectedComponent<IPreferencesState> implements AfterViewInit {
  @ViewChild('drawer')
  public drawer!: MatDrawer
  public isAcrylicEnabled!: boolean
  
  constructor(private toolbar: ToolbarService, store$: Store<IPreferencesState>) {
    super(store$)
    this.store$.select(selectIsAcrylicEnabled).subscribe(isAcrylicEnabled => this.isAcrylicEnabled = isAcrylicEnabled)
  }
  
  ngAfterViewInit(): void {
    this.toolbar.setDrawer(this.drawer)
  }
}

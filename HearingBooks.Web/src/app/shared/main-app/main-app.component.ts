import { AfterViewInit, Component, ViewChild } from '@angular/core'
import { MatDrawer } from '@angular/material/sidenav'
import { Store } from '@ngrx/store'
import { TranslateService } from '@ngx-translate/core'
import { IPreferencesState } from 'src/app/preferences/preferences.reducer'
import { selectIsAcrylicEnabled, selectLanguage } from 'src/app/preferences/preferences.selectors'
import StoreConnectedComponent from '../store-connected.component'
import { ToolbarService } from '../toolbar/toolbar.service'

@Component({
  selector: 'hb-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.scss'],
})
export class MainAppComponent extends StoreConnectedComponent<IPreferencesState> implements AfterViewInit {
  @ViewChild('drawer')
  public drawer: MatDrawer
  public isAcrylicEnabled: boolean
  public language: string
  
  constructor(private toolbar: ToolbarService, private translate: TranslateService, store$: Store<IPreferencesState>) {
    super(store$)
    this.store$.select(selectIsAcrylicEnabled).subscribe(isAcrylicEnabled => this.isAcrylicEnabled = isAcrylicEnabled)
    this.store$.select(selectLanguage).subscribe(language => {
      this.language = language
      this.translate.use(this.language)
    })
  }
  
  ngAfterViewInit(): void {
    this.toolbar.setDrawer(this.drawer)
  }
}

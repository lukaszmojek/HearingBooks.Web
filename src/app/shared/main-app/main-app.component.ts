import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import { MatDrawer } from '@angular/material/sidenav'
import { Store } from '@ngrx/store'
import { TranslateService } from '@ngx-translate/core'
import { selectInnerCardType, selectIsAcrylicEnabled, selectLanguage, selectMainCardType } from 'src/app/preferences/preferences.selectors'
import { PreferencesService } from 'src/app/preferences/preferences.service'
import { selectIsSideMenuOpened } from 'src/app/ui/ui.selectors'
import AcrylicAwareComponent from '../acrylic/acrylic-aware.component'
import { AcrylicService } from '../acrylic/acrylic.service'
import { SignalRService } from '../signalr/signalr.service'
import { IApplicationState } from '../state'
import { ToolbarService } from '../toolbar/toolbar.service'

@Component({
  selector: 'hb-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.scss'],
})
export class MainAppComponent
  extends AcrylicAwareComponent<IApplicationState>
  implements OnInit, AfterViewInit {
  @ViewChild('drawer')
  public drawer: MatDrawer
  public language: string
  public isMenuOpened: boolean

  constructor(
    private toolbar: ToolbarService,
    private translate: TranslateService,
    private signalR: SignalRService,
    private preferences: PreferencesService,
    store$: Store<IApplicationState>,
    acrylic: AcrylicService,
  ) {
    super(store$, acrylic)
    this.signalR.connect();
    this.safeSelect$(selectLanguage).subscribe(language => {
      this.language = language
      this.translate.use(this.language)
    })

    this.safeSelect$(selectIsSideMenuOpened).subscribe(isMenuOpened => {
      this.isMenuOpened = isMenuOpened
    })

    this.acrylic.initialize(selectMainCardType, selectInnerCardType, selectIsAcrylicEnabled)
  }

  ngOnInit(): void {
    if (this.preferences.exists()) {
      this.preferences.load()
    }
  }

  ngAfterViewInit(): void {
    this.toolbar.setDrawer(this.drawer)
  }
}

import { AfterViewInit, Component, ViewChild } from '@angular/core'
import { MatDrawer } from '@angular/material/sidenav'
import { Store } from '@ngrx/store'
import { TranslateService } from '@ngx-translate/core'
import { selectLanguage } from 'src/app/preferences/preferences.selectors'
import AcrylicAwareComponent from '../acrylic/acrylic-aware.component'
import { AcrylicService } from '../acrylic/acrylic.service'
import { IApplicationState } from '../state'
import { ToolbarService } from '../toolbar/toolbar.service'

@Component({
  selector: 'hb-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.scss'],
})
export class MainAppComponent
  extends AcrylicAwareComponent<IApplicationState>
  implements AfterViewInit {
  @ViewChild('drawer')
  public drawer: MatDrawer
  public language: string

  constructor(
    private toolbar: ToolbarService,
    private translate: TranslateService,
    store$: Store<IApplicationState>,
    acrylic: AcrylicService,
  ) {
    super(store$, acrylic)
    this.safeSelect$(selectLanguage).subscribe(language => {
      this.language = language
      this.translate.use(this.language)
    })
  }

  ngAfterViewInit(): void {
    this.toolbar.setDrawer(this.drawer)
  }
}

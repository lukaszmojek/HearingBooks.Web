import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import AcrylicAwareComponent from 'src/app/shared/acrylic/acrylic-aware.component'
import { AcrylicService } from 'src/app/shared/acrylic/acrylic.service'
import { IMainComponent } from 'src/app/shared/main-component.interface'
import { IApplicationState } from 'src/app/shared/state'
import { ITextSynthesis, ITextSynthesisRequest } from '../state/models'
import { TextSynthesesActions } from '../state/text-syntheses.actions'
import { selectTextSyntheses } from '../state/text-syntheses.selectors'

@Component({
  selector: 'hb-text-synthesis-list',
  templateUrl: './text-synthesis-list.component.html',
  styleUrls: ['./text-synthesis-list.component.scss'],
})
export class TextSynthesisListComponent
  extends AcrylicAwareComponent<IApplicationState>
  implements IMainComponent, OnInit {
  titleTranslationKey = 'PayAsYouGo.TextSyntheses.Title'
  divider = true
  elevation = true
  border = false

  textSyntheses$: Observable<ITextSynthesis[]>

  constructor(store$: Store<IApplicationState>, acrylic: AcrylicService) {
    super(store$, acrylic)
    this.textSyntheses$ = this.safeSelect$(selectTextSyntheses)
  }

  ngOnInit(): void {
    this.store$.dispatch(TextSynthesesActions.loadTextSynthesesForUser())
  }
}

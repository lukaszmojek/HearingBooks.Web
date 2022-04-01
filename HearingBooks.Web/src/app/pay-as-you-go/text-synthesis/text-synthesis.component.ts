import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { Store } from '@ngrx/store'
import AcrylicAwareComponent from 'src/app/shared/acrylic/acrylic-aware.component'
import { AcrylicService } from 'src/app/shared/acrylic/acrylic.service'
import { IApplicationState } from 'src/app/shared/state'
import { ITextSynthesisRequest } from './models'

@Component({
  selector: 'hb-text-synthesis',
  templateUrl: './text-synthesis.component.html',
  styleUrls: ['./text-synthesis.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextSynthesisComponent extends AcrylicAwareComponent {
  @Input() request: ITextSynthesisRequest

  public get isAcryclic(): boolean {
    return this.acrylic.isAcrylic(this.innerCardType)
  }

  public get isTransparent(): boolean {
    return this.acrylic.isTransparent(this.innerCardType)
  }

  public get isMaterial(): boolean {
    return this.acrylic.isMaterial(this.innerCardType)
  }

  constructor(
    store$: Store<IApplicationState>,
    private acrylic: AcrylicService
  ) {
    super(store$)
  }
}

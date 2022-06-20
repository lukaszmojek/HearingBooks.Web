import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { Store } from '@ngrx/store'
import { FilesService } from 'src/app/files/files.service'
import AcrylicAwareComponent from 'src/app/shared/acrylic/acrylic-aware.component'
import { AcrylicService } from 'src/app/shared/acrylic/acrylic.service'
import { IApplicationState } from 'src/app/shared/state'
import { ITextSynthesis } from '../state/models'

@Component({
  selector: 'hb-text-synthesis',
  templateUrl: './text-synthesis.component.html',
  styleUrls: ['./text-synthesis.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextSynthesisComponent extends AcrylicAwareComponent<IApplicationState> {
  @Input() textSynthesis: ITextSynthesis

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
    acrylic: AcrylicService,
    private fileService: FilesService
  ) {
    super(store$, acrylic)
  }

  downloadSynthesis(): void {
    this.fileService.downloadTextSynthesis$(this.textSynthesis.id, this.textSynthesis.blobName)
  }
}

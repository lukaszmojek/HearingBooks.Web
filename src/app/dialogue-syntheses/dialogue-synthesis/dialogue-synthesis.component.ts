import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FilesService } from 'src/app/files/files.service';
import AcrylicAwareComponent from 'src/app/shared/acrylic/acrylic-aware.component';
import { AcrylicService } from 'src/app/shared/acrylic/acrylic.service';
import { IApplicationState } from 'src/app/shared/state';
import { ITextSynthesis } from 'src/app/text-syntheses/state/models';
import { IDialogueSynthesis } from '../state/models';

@Component({
  selector: 'hb-dialogue-synthesis',
  templateUrl: './dialogue-synthesis.component.html',
  styleUrls: ['./dialogue-synthesis.component.scss']
})
export class DialogueSynthesisComponent extends AcrylicAwareComponent<IApplicationState> {
  @Input() dialogueSynthesis: IDialogueSynthesis

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
    this.fileService.downloadDialogueSynthesis$(this.dialogueSynthesis.id, this.dialogueSynthesis.blobName)
  }
}


import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import AcrylicAwareComponent from 'src/app/shared/acrylic/acrylic-aware.component';
import { AcrylicService } from 'src/app/shared/acrylic/acrylic.service';
import { IMainComponent } from 'src/app/shared/main-component.interface';
import { SignalRService } from 'src/app/shared/signalr/signalr.service';
import { IApplicationState } from 'src/app/shared/state';
import { ITextSynthesis } from 'src/app/text-syntheses/state/models';
import { DialogueSynthesesActions } from '../state/dialogue-syntheses.actions';
import { selectDialogueSyntheses, selectIsActionInProgress, selectShouldShowEmptyState } from '../state/dialogue-syntheses.selectors';
import { IDialogueSynthesis } from '../state/models';

@Component({
  selector: 'hb-dialogue-synthesis-list',
  templateUrl: './dialogue-synthesis-list.component.html',
  styleUrls: ['./dialogue-synthesis-list.component.scss']
})
export class DialogueSynthesisListComponent extends AcrylicAwareComponent<IApplicationState>
  implements IMainComponent, OnInit {
  titleTranslationKey = 'PayAsYouGo.DialogueSyntheses.Title'
  emptyStateMessageTranslationKey = 'EmptyState.DialogueSyntheses'
  requestTextSynthesisRoute = 'request'
  redirectButtonTranslationKey = 'PayAsYouGo.DialogueSyntheses.Redirect'
  divider = true
  elevation = true
  border = false

  isActionInProgress$: Observable<boolean>
  dialogueSyntheses$: Observable<IDialogueSynthesis[]>
  shouldShowEmptyState$: Observable<boolean>

  constructor(private signalR: SignalRService, store$: Store<IApplicationState>, acrylic: AcrylicService) {
    super(store$, acrylic)
    this.signalR.connect()
    this.dialogueSyntheses$ = this.safeSelect$(selectDialogueSyntheses)
    this.isActionInProgress$ = this.safeSelect$(selectIsActionInProgress)
    this.shouldShowEmptyState$ = this.safeSelect$(selectShouldShowEmptyState)
  }

  ngOnInit(): void {
    this.store$.dispatch(DialogueSynthesesActions.loadDialogueSynthesesForUser())
  }
}

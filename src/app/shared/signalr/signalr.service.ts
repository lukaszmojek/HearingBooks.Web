import { Injectable } from '@angular/core';

import * as signalR from "@microsoft/signalr";
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest } from 'rxjs';
import { selectUserId } from 'src/app/auth/auth.selectors';
import { DialogueSynthesesActions } from 'src/app/dialogue-syntheses/state/dialogue-syntheses.actions';
import { IDialogueSynthesis } from 'src/app/dialogue-syntheses/state/models';
import { ITextSynthesis } from 'src/app/text-syntheses/state/models';
import { TextSynthesesActions } from 'src/app/text-syntheses/state/text-syntheses.actions';
import { environment } from 'src/environments/environment';
import { SnackbarNotificationsService } from '../notifications/snackbar-notifications.service';


@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private connection: signalR.HubConnection;
  private userId: string | null
  private synthesisProcessedTranslationKeys = {
    text: 'Notifications.TextSyntheses.Processed',
    dialogue: 'Notifications.DialogueSyntheses.Processed',
  }
  private synthesisProcessedTranslations: {
    text: string,
    dialogue: string,
  }

  constructor(private store$: Store, private snackbarNotifications: SnackbarNotificationsService, private translate: TranslateService) {
    combineLatest([
      this.translate.get(this.synthesisProcessedTranslationKeys.text),
      this.translate.get(this.synthesisProcessedTranslationKeys.dialogue),
    ]).subscribe(([textTranslation, dialogueTranslation]) => {
      this.synthesisProcessedTranslations = {
        text: textTranslation,
        dialogue: dialogueTranslation
      }
    })
  }

  connect(): void {
    if (this.connection)
      return;

    console.log('SignalR connected!')

    this.store$.select(selectUserId).subscribe(x => {
      this.userId = x
    })
      
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.baseSignalRUrl}/syntheses`)
      .build();

    this.connection.on('text-synthesis-updated', (userId: string, textSynthesis: ITextSynthesis) => {
      if (this.userId !== userId) {
        return
      }

      this.snackbarNotifications.showSuccessNotification(this.synthesisProcessedTranslations.text)
      this.store$.dispatch(TextSynthesesActions.textSynthesisUpdated({ textSynthesis: textSynthesis }))
    })

    this.connection.on('dialogue-synthesis-updated', (userId: string, dialogueSynthesis: IDialogueSynthesis) => {
      if (this.userId !== userId) {
        return
      }
      
      this.snackbarNotifications.showSuccessNotification(this.synthesisProcessedTranslations.dialogue)
      this.store$.dispatch(DialogueSynthesesActions.dialogueSynthesisUpdated({ dialogueSynthesis: dialogueSynthesis }))
    });
    
    this.connection.start().catch(err => document.write(err));
  }

  send(username: string, message: string): void {
    this.connection.send("SendMessage", username, message)
      .then((_) => _);
  }
}

import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LanguagesActions } from 'src/app/languages/languages.actions';
import { selectLanguages, selectVoicesFromSelectedLanguage, selectIsLanguageSelected } from 'src/app/languages/languages.selectors';
import { ISynthesisLanguage, ISynthesisVoice } from 'src/app/languages/models';
import AcrylicAwareComponent from 'src/app/shared/acrylic/acrylic-aware.component';
import { AcrylicService } from 'src/app/shared/acrylic/acrylic.service';
import { SimpleErrorStateMatcher } from 'src/app/shared/login/simple-error-state-matcher';
import { IMainComponent } from 'src/app/shared/main-component.interface';
import { IApplicationState } from 'src/app/shared/state';
import { selectIsAnyActionInProgress } from 'src/app/shared/state/index.selectors';
import { DialogueSynthesesActions } from '../state/dialogue-syntheses.actions';
import { IDialogueSynthesisRequest } from '../state/models';

@Component({
  selector: 'hb-request-dialogue-synthesis',
  templateUrl: './request-dialogue-synthesis.component.html',
  styleUrls: ['./request-dialogue-synthesis.component.scss']
})
export class RequestDialogueSynthesisComponent extends AcrylicAwareComponent<IApplicationState>
  implements IMainComponent {
  private formFieldNames = {
    title: 'title',
    language: 'language',
    firstSpeakerVoice: 'firstSpeakerVoice',
    secondSpeakerVoice: 'secondSpeakerVoice',
    dialogueText: 'dialogueText',
  }

  titleTranslationKey = 'PayAsYouGo.RequestDialogueSynthesis.Title'
  divider = true
  elevation = true
  border = false

  dialogueTextMaxCharacterCount = 1000
  dialogueTextRows = 20

  dialogueSynthesisFormGroup: FormGroup

  availableLanguages$: Observable<ISynthesisLanguage[]>
  availableVoices$: Observable<ISynthesisVoice[]>

  isLanguageSelected: boolean
  isAnyActionInProgress: boolean

  selectedLanguage$: ISynthesisLanguage

  matcher = new SimpleErrorStateMatcher()

  get titleFormControl(): FormControl {
    return this.getFormControl(this.formFieldNames.title)
  }

  get languageFormControl(): FormControl {
    return this.getFormControl(this.formFieldNames.language)
  }

  get firstSpeakerVoiceFormControl(): FormControl {
    return this.getFormControl(this.formFieldNames.firstSpeakerVoice)
  }

  get secondSpeakerVoiceFormControl(): FormControl {
    return this.getFormControl(this.formFieldNames.secondSpeakerVoice)
  }

  get dialogueTextFormControl(): FormControl {
    return this.getFormControl(this.formFieldNames.dialogueText)
  }

  get dialogueTextLength(): string {
    return `${this.dialogueTextFormControl.value.length}/${this.dialogueTextMaxCharacterCount}`
  }

  get isFormInvalid(): boolean {
    return this.dialogueSynthesisFormGroup.invalid
  }

  private getFormControl(name: string): FormControl {
    return this.dialogueSynthesisFormGroup.get(name) as FormControl
  }

  constructor(private formBuilder: FormBuilder, store$: Store<IApplicationState>, acrylic: AcrylicService) {
    super(store$, acrylic)
    this.store$.dispatch(LanguagesActions.loadLangaugesWithVoices())

    this.createRequestTextSynthesisForm()

    this.availableLanguages$ = this.safeSelect$(selectLanguages)
    this.availableVoices$ = this.safeSelect$(selectVoicesFromSelectedLanguage)

    this.safeSelect$(selectIsLanguageSelected).subscribe(isLanguageSelected => {
      this.isLanguageSelected = isLanguageSelected

      this.handleVoiceFormControlStateUpdate()
    })

    this.safeSelect$(selectIsAnyActionInProgress).subscribe(isAnyActionInProgress => {
      this.isAnyActionInProgress = isAnyActionInProgress

      this.handleLanguageFormControlStateUpdate()
    })

    this.dialogueTextFormControl.valueChanges.subscribe(x => { console.log(this.dialogueSynthesisFormGroup) })
  }

  requestDialogueSynthesis(): void {
    const dialogueSyntesisRequest = {
      title: this.titleFormControl.value,
      dialogueText: this.dialogueTextFormControl.value,
      language: (this.languageFormControl.value as ISynthesisLanguage).symbol,
      firstSpeakerVoice: (this.firstSpeakerVoiceFormControl.value as ISynthesisVoice).name,
      secondSpeakerVoice: (this.secondSpeakerVoiceFormControl.value as ISynthesisVoice).name,
    } as IDialogueSynthesisRequest

    this.store$.dispatch(DialogueSynthesesActions.requestDialogueSynthesis({ dialogueSynthesisRequest: dialogueSyntesisRequest }))
  }

  updateSelectedLanguage(selectedLanguage: ISynthesisLanguage): void {
    this.store$.dispatch(LanguagesActions.languageSelected({ language: selectedLanguage }))
  }

  private createRequestTextSynthesisForm(): void {
    this.dialogueSynthesisFormGroup = this.formBuilder.group({
      [this.formFieldNames.title]: this.formBuilder.control('', [Validators.required]),
      [this.formFieldNames.language]: this.formBuilder.control('', [Validators.required]),
      [this.formFieldNames.firstSpeakerVoice]: this.formBuilder.control('', [Validators.required]),
      [this.formFieldNames.secondSpeakerVoice]: this.formBuilder.control('', [Validators.required]),
      [this.formFieldNames.dialogueText]: this.formBuilder.control('', [Validators.required, Validators.maxLength(this.dialogueTextMaxCharacterCount)])
    })
  }

  private handleLanguageFormControlStateUpdate(): void {
    this.isAnyActionInProgress
      ? this.languageFormControl.disable()
      : this.languageFormControl.enable()
  }

  private handleVoiceFormControlStateUpdate(): void {
    if (this.isLanguageSelected) {
      this.firstSpeakerVoiceFormControl.enable()
      this.secondSpeakerVoiceFormControl.enable()
      return
    }

    this.firstSpeakerVoiceFormControl.disable()
    this.secondSpeakerVoiceFormControl.disable()
  }
}
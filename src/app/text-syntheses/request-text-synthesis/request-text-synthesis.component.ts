import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'
import AcrylicAwareComponent from 'src/app/shared/acrylic/acrylic-aware.component'
import { AcrylicService } from 'src/app/shared/acrylic/acrylic.service'
import { SimpleErrorStateMatcher } from 'src/app/shared/login/simple-error-state-matcher'
import { IMainComponent } from 'src/app/shared/main-component.interface'
import { IApplicationState } from 'src/app/shared/state'
import { ISynthesisLanguage, ISynthesisVoice } from '../../languages/models'
import { LanguagesActions } from 'src/app/languages/languages.actions'
import { Observable } from 'rxjs'
import { selectIsLanguageSelected, selectLanguages, selectVoicesFromSelectedLanguage } from 'src/app/languages/languages.selectors'
import { ITextSynthesisRequest } from '../state/models'
import { TextSynthesesActions } from '../state/text-syntheses.actions'
import { selectIsAnyActionInProgress } from 'src/app/shared/state/index.selectors'
import { SignalRService } from 'src/app/shared/signalr/signalr.service'

@Component({
  selector: 'hb-request-text-synthesis',
  templateUrl: './request-text-synthesis.component.html',
  styleUrls: ['./request-text-synthesis.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestTextSynthesisComponent
  extends AcrylicAwareComponent<IApplicationState>
  implements IMainComponent {
  private formFieldNames = {
    title: 'title',
    language: 'language',
    voice: 'voice',
    textToSynthesize: 'textToSynthesize',
  }

  titleTranslationKey = 'PayAsYouGo.RequestTextSynthesis.Title'
  divider = true
  elevation = true
  border = false

  textToSynthesizeMaxCharacterCount = 5000
  textToSynthesizeRows = 20

  textSynthesisFormGroup: FormGroup

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

  get voiceFormControl(): FormControl {
    return this.getFormControl(this.formFieldNames.voice)
  }

  get textToSynthesizeFormControl(): FormControl {
    return this.getFormControl(this.formFieldNames.textToSynthesize)
  }

  get textToSynthesizeLength(): string {
    return `${this.textToSynthesizeFormControl.value.length}/${this.textToSynthesizeMaxCharacterCount}`
  }

  get isFormInvalid(): boolean {
    return this.textSynthesisFormGroup.invalid
  }

  private getFormControl(name: string): FormControl {
    return this.textSynthesisFormGroup.get(name) as FormControl
  }

  constructor(private formBuilder: FormBuilder, private signalR: SignalRService, store$: Store<IApplicationState>, acrylic: AcrylicService) {
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
  }

  requestTextSynthesis(): void {
    const textSyntesisRequest = {
      title: this.titleFormControl.value,
      textToSynthesize: this.textToSynthesizeFormControl.value,
      language: (this.languageFormControl.value as ISynthesisLanguage).symbol,
      voice: (this.voiceFormControl.value as ISynthesisVoice).name,
    } as ITextSynthesisRequest

    this.store$.dispatch(TextSynthesesActions.requestTextSynthesis({ textSynthesisRequest: textSyntesisRequest }))
  }

  updateSelectedLanguage(selectedLanguage: ISynthesisLanguage): void {
    this.store$.dispatch(LanguagesActions.languageSelected({ language: selectedLanguage }))
  }

  private createRequestTextSynthesisForm(): void {
    this.textSynthesisFormGroup = this.formBuilder.group({
      [this.formFieldNames.title]: this.formBuilder.control('', [Validators.required]),
      [this.formFieldNames.language]: this.formBuilder.control('', [Validators.required]),
      [this.formFieldNames.voice]: this.formBuilder.control('', [Validators.required]),
      [this.formFieldNames.textToSynthesize]: this.formBuilder.control('', [Validators.required, Validators.maxLength(this.textToSynthesizeMaxCharacterCount)])
    })
  }

  private handleLanguageFormControlStateUpdate(): void {
    this.isAnyActionInProgress
      ? this.languageFormControl.disable()
      : this.languageFormControl.enable()
  }

  private handleVoiceFormControlStateUpdate(): void {
    this.isLanguageSelected
      ? this.voiceFormControl.enable()
      : this.voiceFormControl.disable()
  }
}

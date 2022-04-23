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
import { isLanguageSelected, selectLanguages, selectVoicesFromSelectedLanguage } from 'src/app/languages/languages.selectors'
import { ITextSynthesisRequest } from '../state/models'
import { TextSynthesesActions } from '../state/text-syntheses.actions'

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

  textToSynthesizeMaxCharacterCount = 500
  textToSynthesizeRows = 20

  textSynthesisFormGroup: FormGroup

  availableLanguages$: Observable<ISynthesisLanguage[]>
  availableVoices$: Observable<ISynthesisVoice[]>
  isLanguageSelected$: Observable<boolean>

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

  constructor(private formBuilder: FormBuilder, store$: Store<IApplicationState>, acrylic: AcrylicService) {
    super(store$, acrylic)
    this.store$.dispatch(LanguagesActions.loadLangaugesWithVoices())

    this.createRequestTextSynthesisForm()

    this.availableLanguages$ = this.safeSelect$(selectLanguages)
    this.availableVoices$ = this.safeSelect$(selectVoicesFromSelectedLanguage)
    this.isLanguageSelected$ = this.safeSelect$(isLanguageSelected)
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

  private createRequestTextSynthesisForm() {
    this.textSynthesisFormGroup = this.formBuilder.group({
      'title': this.formBuilder.control('', [Validators.required]),
      'language': this.formBuilder.control('', [Validators.required]),
      'voice': this.formBuilder.control('', [Validators.required]),
      'textToSynthesize': this.formBuilder.control('', [Validators.required, Validators.maxLength(this.textToSynthesizeMaxCharacterCount)])
    })
  }
}

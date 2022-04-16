import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'
import AcrylicAwareComponent from 'src/app/shared/acrylic/acrylic-aware.component'
import { AcrylicService } from 'src/app/shared/acrylic/acrylic.service'
import { SimpleErrorStateMatcher } from 'src/app/shared/login/simple-error-state-matcher'
import { IMainComponent } from 'src/app/shared/main-component.interface'
import { IApplicationState } from 'src/app/shared/state'
import { TextSynthesisRequest, TextSynthesisService } from '../text-synthesis.service'
import { ISynthesisLanguage, ISynthesisVoice } from '../../languages/models'
import { LanguagesActions } from 'src/app/languages/languages.actions'
import { Observable } from 'rxjs'
import { selectLanguages, selectVoicesFromSelectedLanguage } from 'src/app/languages/languages.selectors'

@Component({
  selector: 'hb-request-text-synthesis',
  templateUrl: './request-text-synthesis.component.html',
  styleUrls: ['./request-text-synthesis.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestTextSynthesisComponent
  extends AcrylicAwareComponent<IApplicationState>
  implements IMainComponent {
  titleTranslationKey = 'PayAsYouGo.RequestTextSynthesis.Title'
  divider = true
  elevation = true
  border = false

  textToSynthesizeMaxCharacterCount = 500

  //TODO: Consider changing that to reactive forms
  titleFormControl = new FormControl('', [Validators.required])
  languageFormControl = new FormControl('', [Validators.required])
  voiceFormControl = new FormControl('', [Validators.required])
  textToSynthesizeFormControl = new FormControl('', [Validators.required, Validators.maxLength(this.textToSynthesizeMaxCharacterCount)])
  textSynthesisFormGroup = new FormGroup({
    'title': this.titleFormControl,
    'language': this.languageFormControl,
    'voice': this.voiceFormControl,
    'textToSynthesize': this.textToSynthesizeFormControl
  })

  //TODO: Move languages and voices to DB
  availableLanguages$: Observable<ISynthesisLanguage[]>
  availableVoices$: Observable<ISynthesisVoice[]>

  selectedLanguage$: ISynthesisLanguage

  matcher = new SimpleErrorStateMatcher()

  get textToSynthesizeLength(): string {
    return `${this.textToSynthesizeFormControl.value.length}/${this.textToSynthesizeMaxCharacterCount}`
  }

  get isFormInvalid(): boolean {
    return this.textSynthesisFormGroup.invalid
  }

  constructor(store$: Store<IApplicationState>, acrylic: AcrylicService, private textSynthesisService: TextSynthesisService) {
    super(store$, acrylic)
    this.store$.dispatch(LanguagesActions.loadLangaugesWithVoices())

    this.availableLanguages$ = this.safeSelect$(selectLanguages)
    this.availableVoices$ = this.safeSelect$(selectVoicesFromSelectedLanguage)
  }

  requestTextSynthesis(): void {
    const textSyntesisRequest = {
      title: this.titleFormControl.value,
      textToSynthesize: this.textToSynthesizeFormControl.value,
      language: (this.languageFormControl.value as ISynthesisLanguage).symbol,
      voice: (this.voiceFormControl.value as ISynthesisVoice).name,
    } as TextSynthesisRequest

    this.textSynthesisService.requestTextSynthesis$(textSyntesisRequest).subscribe(result => {
      console.log(result)
    })
  }

  updateSelectedLanguage(selectedLanguage: ISynthesisLanguage): void {
    this.store$.dispatch(LanguagesActions.languageSelected({ language: selectedLanguage }))
  }
}

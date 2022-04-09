import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'
import AcrylicAwareComponent from 'src/app/shared/acrylic/acrylic-aware.component'
import { AcrylicService } from 'src/app/shared/acrylic/acrylic.service'
import { SimpleErrorStateMatcher } from 'src/app/shared/login/simple-error-state-matcher'
import { IMainComponent } from 'src/app/shared/main-component.interface'
import { IApplicationState } from 'src/app/shared/state'
import { TextSynthesisRequest, TextSynthesisService } from '../text-synthesis.service'
import { ISynthesisLanguage, ISynthesisVoice } from './models'

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
  availableLanguages: ISynthesisLanguage[]

  matcher = new SimpleErrorStateMatcher()


  get availableVoices(): ISynthesisVoice[] {
    return []
  }

  get textToSynthesizeLength(): string {
    return `${this.textToSynthesizeFormControl.value.length}/${this.textToSynthesizeMaxCharacterCount}`
  }

  get isFormInvalid(): boolean {
    return this.textSynthesisFormGroup.invalid
  }

  constructor(store$: Store<IApplicationState>, acrylic: AcrylicService, private textSynthesisService: TextSynthesisService) {
    super(store$, acrylic)
  }

  requestTextSynthesis(): void {
    const textSyntesisRequest = {
      title: this.titleFormControl.value,
      textToSynthesize: this.textToSynthesizeFormControl.value,
      // language: this.languageFormControl.value,
      // voice: this.voiceFormControl.value,
    } as TextSynthesisRequest

    this.textSynthesisService.requestTextSynthesis$(textSyntesisRequest).subscribe(result => {
      console.log(result)
    })
  }
}

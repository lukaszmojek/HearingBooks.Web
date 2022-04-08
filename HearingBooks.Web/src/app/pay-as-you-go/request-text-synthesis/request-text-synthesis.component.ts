import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'
import AcrylicAwareComponent from 'src/app/shared/acrylic/acrylic-aware.component'
import { AcrylicService } from 'src/app/shared/acrylic/acrylic.service'
import { SimpleErrorStateMatcher } from 'src/app/shared/login/simple-error-state-matcher'
import { IMainComponent } from 'src/app/shared/main-component.interface'
import { IApplicationState } from 'src/app/shared/state'
import { ISynthesisLanguage, ISynthesisVoice, SynthesisVoiceGender } from './models'

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

  //TODO: Move languages and voices to DB
  availableLanguages: ISynthesisLanguage[] = [
    {
      symbol: 'PL',
      name: 'Polski'
    },
    {
      symbol: 'EN',
      name: 'English'
    },
  ]

  availableVoices: ISynthesisVoice[] = [
    {
      name: 'Krysia',
      gender: SynthesisVoiceGender.Woman
    }
  ]

  matcher = new SimpleErrorStateMatcher()

  get textToSynthesizeLength(): string {
    return `${this.textToSynthesizeFormControl.value.length}/${this.textToSynthesizeMaxCharacterCount}`
  }

  constructor(store$: Store<IApplicationState>, acrylic: AcrylicService) {
    super(store$, acrylic)
  }
}

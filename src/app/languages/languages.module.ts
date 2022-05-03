import { NgModule } from '@angular/core'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { LanguagesEffects } from './languages.effects'
import { languagesFeature } from './languages.reducer'
import { SynthesisLanguagePipe } from './synthesis-language.pipe'
import { SynthesisVoicePipe } from './synthesis-voice.pipe'

const pipes = [
  SynthesisLanguagePipe, SynthesisVoicePipe
]

@NgModule({
  declarations: [...pipes],
  imports: [
    StoreModule.forFeature(languagesFeature),
    EffectsModule.forFeature([LanguagesEffects]),
  ],
  exports: [...pipes]
})
export class LanguagesModule { }

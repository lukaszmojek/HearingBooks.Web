import { NgModule } from '@angular/core'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { LanguagesEffects } from './languages.effects'
import { languagesFeature } from './languages.reducer'

@NgModule({
  imports: [
    StoreModule.forFeature(languagesFeature),
    EffectsModule.forFeature([LanguagesEffects]),
  ]
})
export class LanguagesModule { }

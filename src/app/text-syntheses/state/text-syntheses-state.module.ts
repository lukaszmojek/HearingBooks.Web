import { NgModule } from '@angular/core'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { TextSynthesesEffects } from './text-syntheses.effects'
import { textSynthesesFeature } from './text-syntheses.reducer'

@NgModule({
  imports: [
    StoreModule.forFeature(textSynthesesFeature),
    EffectsModule.forFeature([TextSynthesesEffects]),
  ]
})
export class TextSynthesesStateModule { }

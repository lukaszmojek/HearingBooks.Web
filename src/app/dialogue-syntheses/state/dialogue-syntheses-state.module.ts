import { NgModule } from '@angular/core'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { DialogueSynthesesEffects } from './dialogue-syntheses.effects'
import { dialogueSynthesesFeature } from './dialogue-syntheses.reducer'

@NgModule({
  imports: [
    StoreModule.forFeature(dialogueSynthesesFeature),
    EffectsModule.forFeature([DialogueSynthesesEffects]),
  ]
})
export class DialogueSynthesesStateModule { }

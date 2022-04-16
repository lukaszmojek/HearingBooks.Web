import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { uiFeature } from './ui.reducer'

@NgModule({
  imports: [StoreModule.forFeature(uiFeature)],
  providers: [],
})
export class UIModule {}

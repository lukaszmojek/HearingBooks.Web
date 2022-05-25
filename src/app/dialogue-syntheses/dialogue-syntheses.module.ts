import { NgModule } from '@angular/core'
import { SharedModule } from '../shared/shared.module'
import { DialogueSynthesisRoutingModule } from './dialogue-syntheses-routing.module'
import { DialogueSynthesisListComponent } from './dialogue-synthesis-list/dialogue-synthesis-list.component'
import { DialogueSynthesisComponent } from './dialogue-synthesis/dialogue-synthesis.component'
import { RequestDialogueSynthesisComponent } from './request-dialogue-synthesis/request-dialogue-synthesis.component'
import { DialogueSynthesesStateModule } from './state/dialogue-syntheses-state.module';
import { DialogueSynthesisPipe } from './dialogue-synthesis.pipe'

const components = [
  DialogueSynthesisListComponent,
  DialogueSynthesisComponent,
  RequestDialogueSynthesisComponent,
]

const modules = [SharedModule, DialogueSynthesisRoutingModule, DialogueSynthesesStateModule]

@NgModule({
  imports: [...modules],
  declarations: [...components, DialogueSynthesisPipe],
  exports: [...components],
})
export class DialogueSynthesesModule { }

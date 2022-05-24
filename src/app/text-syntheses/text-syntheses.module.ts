import { NgModule } from '@angular/core'
import { SharedModule } from '../shared/shared.module'
import { TextSynthesesRoutingModule } from './text-syntheses-routing.module'
import { TextSynthesisListComponent } from './text-synthesis-list/text-synthesis-list.component'
import { TextSynthesisComponent } from './text-synthesis/text-synthesis.component'
import { TextSynthesisPipe } from './text-synthesis/text-synthesis.pipe'
import { RequestTextSynthesisComponent } from './request-text-synthesis/request-text-synthesis.component';
import { TextSynthesesStateModule } from './state/text-syntheses-state.module'

const components = [
  TextSynthesisListComponent,
  TextSynthesisComponent,
  RequestTextSynthesisComponent,
]

const modules = [SharedModule, TextSynthesesRoutingModule, TextSynthesesStateModule]

const pipes = [TextSynthesisPipe]

@NgModule({
  imports: [...modules],
  declarations: [...components, ...pipes],
  exports: [...components, ...pipes],
})
export class TextSynthesesModule { }

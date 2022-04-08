import { NgModule } from '@angular/core'
import { SharedModule } from '../shared/shared.module'
import { PayAsYouGoRoutingModule } from './pay-as-you-go-routing.module'
import { TextSynthesisListComponent } from './text-synthesis-list/text-synthesis-list.component'
import { TextSynthesisComponent } from './text-synthesis/text-synthesis.component'
import { TextSynthesisPipe } from './text-synthesis/text-synthesis.pipe'
import { RequestTextSynthesisComponent } from './request-text-synthesis/request-text-synthesis.component';
import { SynthesisLanguagePipe } from './request-text-synthesis/synthesis-language.pipe';
import { SynthesisVoicePipe } from './request-text-synthesis/synthesis-voice.pipe'

const components = [
  TextSynthesisListComponent,
  TextSynthesisComponent,
  RequestTextSynthesisComponent,
]

const modules = [SharedModule, PayAsYouGoRoutingModule]

const pipes = [TextSynthesisPipe, SynthesisLanguagePipe, SynthesisVoicePipe]

@NgModule({
  imports: [...modules],
  declarations: [...components, ...pipes],
  exports: [...components, ...pipes],
})
export class PayAsYouGoModule { }

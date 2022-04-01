import { NgModule } from '@angular/core'
import { SharedModule } from '../shared/shared.module';
import { PayAsYouGoRoutingModule } from './pay-as-you-go-routing.module';
import { TextSynthesisRequestListComponent } from './text-synthesis-request-list/text-synthesis-request-list.component';
import { TextSynthesisRequestComponent } from './text-synthesis-request/text-synthesis-request.component';
import { TextSynthesisPipe } from './text-synthesis-request/text-synthesis.pipe'

const components = [
  TextSynthesisRequestListComponent,
  TextSynthesisRequestComponent
]

const modules = [
  SharedModule,
  PayAsYouGoRoutingModule
]

@NgModule({
  imports: [
    ...modules
  ],
  declarations: [
    ...components,
    TextSynthesisPipe
  ],
  exports: [
    ...components
  ]
})
export class PayAsYouGoModule {}

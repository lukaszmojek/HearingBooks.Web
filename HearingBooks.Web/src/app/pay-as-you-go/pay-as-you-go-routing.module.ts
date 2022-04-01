import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { TextSynthesisRequestListComponent } from './text-synthesis-request-list/text-synthesis-request-list.component'

const routes: Routes = [
  {
    'path': 'text-syntheses',
    'component': TextSynthesisRequestListComponent
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayAsYouGoRoutingModule {}
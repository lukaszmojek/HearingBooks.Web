import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { RequestTextSynthesisComponent } from './request-text-synthesis/request-text-synthesis.component'
import { TextSynthesisListComponent } from './text-synthesis-list/text-synthesis-list.component'

const routes: Routes = [
  {
    path: 'text-syntheses',
    component: TextSynthesisListComponent,
  },
  {
    path: 'request-text-syntheses',
    component: RequestTextSynthesisComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayAsYouGoRoutingModule {}

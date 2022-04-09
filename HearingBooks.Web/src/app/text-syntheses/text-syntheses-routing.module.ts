import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { RequestTextSynthesisComponent } from './request-text-synthesis/request-text-synthesis.component'
import { TextSynthesisListComponent } from './text-synthesis-list/text-synthesis-list.component'

const routes: Routes = [
  {
    path: '',
    component: TextSynthesisListComponent,
  },
  {
    path: 'request',
    component: RequestTextSynthesisComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TextSynthesesRoutingModule { }

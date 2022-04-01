import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { TextSynthesisListComponent } from './text-synthesis-list/text-synthesis-list.component'

const routes: Routes = [
  {
    'path': 'text-syntheses',
    'component': TextSynthesisListComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayAsYouGoRoutingModule {}
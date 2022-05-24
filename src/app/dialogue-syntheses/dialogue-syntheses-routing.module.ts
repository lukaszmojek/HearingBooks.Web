import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { DialogueSynthesisListComponent } from './dialogue-synthesis-list/dialogue-synthesis-list.component'
import { RequestDialogueSynthesisComponent } from './request-dialogue-synthesis/request-dialogue-synthesis.component'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DialogueSynthesisListComponent,
  },
  {
    path: 'request',
    component: RequestDialogueSynthesisComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DialogueSynthesisRoutingModule { }

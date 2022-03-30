import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { SideMenuComponent } from './core/side-menu/side-menu.component'

const routes: Routes = [
  {
    'path': 'dashboard',
    'component': SideMenuComponent
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { SideMenuComponent } from './shared/side-menu/side-menu.component'
import { ProfileComponent } from './shared/users/profile/profile.component'

const routes: Routes = [
  {
    'path': 'dashboard',
    'component': SideMenuComponent
  },
  {
    'path': 'profile',
    'component': ProfileComponent
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { MaterialModule } from '../material.module'
import { LoggedUserComponent } from './logged-user/logged-user.component'
import { MainAppComponent } from './main-app/main-app.component'
import { SideMenuComponent } from './side-menu/side-menu.component'

const components = [
  MainAppComponent,
  SideMenuComponent,
  LoggedUserComponent
]

@NgModule({
  declarations: [...components],
  imports: [RouterModule, MaterialModule, CommonModule],
  exports: [...components],
})
export class CoreModule {}

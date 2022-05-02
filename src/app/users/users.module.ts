import { NgModule } from '@angular/core'
import { SharedModule } from '../shared/shared.module'
import { ChangePasswordComponent } from './change-password/change-password.component'
import { ProfileComponent } from './profile/profile.component'
import { ProfileDetailsComponent } from './profile/profile-details/profile-details.component'
import { PreferencesModule } from '../preferences/preferences.module'
import { PreferencesComponent } from './profile/preferences/preferences.component'
import { UsersRoutingModule } from './users-routing.module'

const components = [
  ChangePasswordComponent,
  ProfileComponent,
  ProfileDetailsComponent,
  PreferencesComponent
]

const modules = [
  SharedModule,
  PreferencesModule,
  UsersRoutingModule
]

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...components],
})
export class UsersModule { }

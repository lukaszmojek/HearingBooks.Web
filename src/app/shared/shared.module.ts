import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'
import { AuthModule } from '../auth/auth.module'
import { MaterialModule } from '../material.module'
import { PreferencesModule } from '../preferences/preferences.module'
import { UIModule } from '../ui/ui.module'
import { LoggedUserComponent } from './logged-user/logged-user.component'
import { MainAppComponent } from './main-app/main-app.component'
import { SideMenuComponent } from './side-menu/side-menu.component'
import { ToolbarComponent } from './toolbar/toolbar.component'
import { ProfileComponent } from './users/profile/profile.component'
import { PreferencesComponent } from './users/profile/preferences/preferences.component'
import { ProfileDetailsComponent } from './users/profile/profile-details/profile-details.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CardComponent } from './card/card.component'
import { LoginComponent } from './login/login.component'
import { LanguagesModule } from '../languages/languages.module'
import { ShortenTextPipe } from './shorten-text.pipe'
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SkeletonComponent } from './skeleton/skeleton.component'

const components = [
  MainAppComponent,
  SideMenuComponent,
  LoggedUserComponent,
  ToolbarComponent,
  ProfileComponent,
  PreferencesComponent,
  ProfileDetailsComponent,
  CardComponent,
  LoginComponent,
  SkeletonComponent
]

const modules = [
  CommonModule,
  MaterialModule,
  RouterModule,
  TranslateModule,
  AuthModule,
  LanguagesModule,
  UIModule,
  PreferencesModule,
  FormsModule,
  ReactiveFormsModule,
  ReactiveFormsModule,
  NgxSkeletonLoaderModule
]

const pipes = [
  ShortenTextPipe
]
@NgModule({
  declarations: [...components, ...pipes],
  imports: [...modules],
  exports: [...components, ...modules, ...pipes],
})
export class SharedModule { }

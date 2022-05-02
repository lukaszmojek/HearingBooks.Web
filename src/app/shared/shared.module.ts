import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'
import { AuthModule } from '../auth/auth.module'
import { MaterialModule } from '../material.module'
import { UIModule } from '../ui/ui.module'
import { LoggedUserComponent } from './logged-user/logged-user.component'
import { MainAppComponent } from './main-app/main-app.component'
import { SideMenuComponent } from './side-menu/side-menu.component'
import { ToolbarComponent } from './toolbar/toolbar.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CardComponent } from './card/card.component'
import { LoginComponent } from './login/login.component'
import { LanguagesModule } from '../languages/languages.module'
import { ShortenTextPipe } from './shorten-text.pipe'
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SkeletonComponent } from './skeleton/skeleton.component';
import { EmptyStateComponent } from './empty-state/empty-state.component'
import { UserDetailsComponent } from './user-details/user-details.component'

const components = [
  MainAppComponent,
  SideMenuComponent,
  LoggedUserComponent,
  ToolbarComponent,
  CardComponent,
  LoginComponent,
  SkeletonComponent,
  EmptyStateComponent,
  UserDetailsComponent
]

const modules = [
  CommonModule,
  MaterialModule,
  RouterModule,
  TranslateModule,
  AuthModule,
  LanguagesModule,
  UIModule,
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

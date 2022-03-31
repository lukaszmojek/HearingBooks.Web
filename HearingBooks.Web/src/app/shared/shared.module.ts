import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthModule } from '../auth/auth.module';
import { MaterialModule } from '../material.module';
import { PreferencesModule } from '../preferences/preferences.module';
import { UIModule } from '../ui/ui.module';
import { LoggedUserComponent } from './logged-user/logged-user.component';
import { MainAppComponent } from './main-app/main-app.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { CardComponent } from './card/card.component';

const components = [
  MainAppComponent,
  SideMenuComponent,
  LoggedUserComponent
]

const modules = [
  CommonModule,
  MaterialModule,
  RouterModule,
  TranslateModule,
  AuthModule,
  UIModule,
  PreferencesModule,
]

@NgModule({
  declarations: [
    ...components,
    ToolbarComponent,
    CardComponent,
  ],
  imports: [
    ...modules,
  ],
  exports: [
    ...components,
    ...modules,
  ]
})
export class SharedModule {}

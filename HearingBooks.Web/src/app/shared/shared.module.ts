import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../material.module';
import { LoggedUserComponent } from './logged-user/logged-user.component';
import { MainAppComponent } from './main-app/main-app.component';
import { SideMenuComponent } from './side-menu/side-menu.component';

const components = [
  MainAppComponent,
  SideMenuComponent,
  LoggedUserComponent
]

const modules = [
  CommonModule,
  MaterialModule,
  RouterModule,
  TranslateModule
]

@NgModule({
  declarations: [
    ...components,
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

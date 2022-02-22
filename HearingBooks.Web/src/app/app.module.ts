import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { MainAppComponent } from './main-app/main-app.component';
import { SideMenuComponent } from './side-menu/side-menu.component';

const baseComponents = [
  MainAppComponent,
  SideMenuComponent
]
@NgModule({
  declarations: [
    AppComponent,
    ...baseComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

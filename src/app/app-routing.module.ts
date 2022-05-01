import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from './auth/auth.guard'
import { LoggedInGuard } from './auth/logged-in.guard'
import { LoginComponent } from './shared/login/login.component'
import { SideMenuComponent } from './shared/side-menu/side-menu.component'
import { ProfileComponent } from './shared/users/profile/profile.component'

const routes: Routes = [
  {
    path: 'login',
    canActivate: [LoggedInGuard],
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: SideMenuComponent,
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    component: ProfileComponent,
  },
  {
    path: 'text-syntheses',
    canActivateChild: [AuthGuard],
    loadChildren: () =>
      import('./text-syntheses/text-syntheses.module').then(
        m => m.TextSynthesesModule
      ),
  },
  {
    path: 'dialogue-syntheses',
    canActivateChild: [AuthGuard],
    loadChildren: () =>
      import('./dialogue-syntheses/dialogue-syntheses.module').then(
        m => m.DialogueSynthesesModule
      ),
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

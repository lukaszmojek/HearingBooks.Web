import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from './auth/auth.guard'
import { LoginComponent } from './shared/login/login.component'
import { SideMenuComponent } from './shared/side-menu/side-menu.component'
import { ProfileComponent } from './shared/users/profile/profile.component'

const routes: Routes = [
  {
    path: 'login',
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
    path: '',
    canLoad: [AuthGuard],
    loadChildren: () =>
      import('./pay-as-you-go/pay-as-you-go.module').then(
        m => m.PayAsYouGoModule
      ),
  },
  {
    path: '**',
    redirectTo: 'login'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

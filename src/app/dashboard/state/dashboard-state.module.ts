import { NgModule } from '@angular/core'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { DashboardEffects } from './dashboard.effects'
import { dashboardFeature } from './dashboard.reducer'

@NgModule({
  imports: [
    StoreModule.forFeature(dashboardFeature),
    EffectsModule.forFeature([DashboardEffects]),
  ]
})
export class DashboardStateModule { }

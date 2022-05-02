import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard.component";

const components = [
  DashboardComponent
]

@NgModule({
  declarations: [...components],
  imports: [
    // StoreModule.forFeature(dashboardFeature),
    // EffectsModule.forFeature([DashboardEffects]),
  ],
  exports: [...components]
})
export class LanguagesModule { }
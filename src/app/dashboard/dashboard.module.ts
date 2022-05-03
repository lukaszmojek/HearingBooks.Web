import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard.component";
import { DashboardStateModule } from "./state/dashboard-state.module";

const components = [
  DashboardComponent
]

@NgModule({
  declarations: [...components],
  imports: [
    SharedModule,
    DashboardStateModule,
    DashboardRoutingModule
  ],
  exports: [...components]
})
export class DashboardModule { }
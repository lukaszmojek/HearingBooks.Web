import { NgModule } from '@angular/core'
import { SharedModule } from '../shared/shared.module'

const modules = [SharedModule]

@NgModule({
  imports: [...modules],
})
export class SubscribersModule {}

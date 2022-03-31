import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { preferencesFeature } from './preferences.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(preferencesFeature),
  ],
  providers: []
})
export class PreferencesModule {}
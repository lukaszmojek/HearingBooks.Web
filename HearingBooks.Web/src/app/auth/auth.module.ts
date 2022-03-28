import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthEffects } from './auth.effects';
import { BearerHeaderInterceptor } from './bearer-header.interceptor';
import * as fromAuth from './auth.reducer'

@NgModule({
  imports: [
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.authReducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BearerHeaderInterceptor, multi: true }
  ]
})
export class AuthModule {}
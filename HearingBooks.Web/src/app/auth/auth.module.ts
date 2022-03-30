import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthEffects } from './auth.effects';
import { authFeature } from './auth.reducer';
import { BearerHeaderInterceptor } from './bearer-header.interceptor';

@NgModule({
  imports: [
    StoreModule.forFeature(authFeature),
    EffectsModule.forFeature([AuthEffects])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BearerHeaderInterceptor, multi: true }
  ]
})
export class AuthModule {}
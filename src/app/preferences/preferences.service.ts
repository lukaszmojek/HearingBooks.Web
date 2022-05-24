import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import StoreConnectedComponent from '../shared/store-connected.component';
import { PreferencesActions } from './preferences.actions';
import { PreferencesModule } from './preferences.module';
import { IPreferencesState } from './preferences.reducer';
import { selectPreferencesFeature } from './preferences.selectors';

@Injectable({
  providedIn: PreferencesModule
})
export class PreferencesService extends StoreConnectedComponent<IPreferencesState> {
  private localStorageKey = 'preferences'
  private loaded = false

  constructor(store$: Store<IPreferencesState>) {
    super(store$)
    this.subscribeToPreferences();
  }

  exists(): boolean {
    return localStorage.getItem(this.localStorageKey) != null
  }

  get(): IPreferencesState {
    const preferencesJson = localStorage.getItem(this.localStorageKey)
    return JSON.parse(preferencesJson!) as IPreferencesState
  }

  load(): void {
    const preferences = this.get()
    this.store$.dispatch(PreferencesActions.preferencesLoaded({ preferences }))
    this.loaded = true
  }

  save(preferences: IPreferencesState): void {
    const preferencesJson = JSON.stringify(preferences)

    localStorage.setItem(this.localStorageKey, preferencesJson)
  }

  private subscribeToPreferences() {
    this.safeSelect$(selectPreferencesFeature).subscribe(preferences => {
      if (!this.exists() || this.loaded) {
        this.save(preferences)
      }
    })
  }
}

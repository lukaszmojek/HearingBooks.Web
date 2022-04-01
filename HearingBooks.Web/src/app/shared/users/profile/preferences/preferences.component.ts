import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { PreferencesActions } from 'src/app/preferences/preferences.actions';
import { IPreferencesState } from 'src/app/preferences/preferences.reducer';
import { selectInnerCardType, selectLanguage } from 'src/app/preferences/preferences.selectors';
import { CardType } from 'src/app/shared/card/card.component';
import StoreConnectedComponent from 'src/app/shared/store-connected.component';

@Component({
  selector: 'hb-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreferencesComponent extends StoreConnectedComponent<IPreferencesState> {
  @Input() preferencesFormGroup: FormGroup

  public innerCardBorder = true
  public innerCardType: CardType
  public availableLanguages = availableLanguages
  public selectedLanguage: string

  public get acrylicFormControl(): FormControl {
    return this.preferencesFormGroup.get('acrylic') as FormControl
  }

  constructor(store$: Store<IPreferencesState>) {
    super(store$)
    this.safeSelect$(selectInnerCardType).subscribe(x => this.innerCardType = x)
    this.safeSelect$(selectLanguage).subscribe(x => this.selectedLanguage = x)
  }

  public setAcrylic(value: boolean): void {
    this.store$.dispatch(PreferencesActions.isAcrylicEnabledToggled({ isAcrylicEnabled: value }))
  }

  public setLanguage(value: any): void {
    this.store$.dispatch(PreferencesActions.languageChanged({ language: value }))
  }
}

const availableLanguages = [
  {
    symbol: 'en',
    name: 'English',
  },
  {
    symbol: 'pl',
    name: 'Polski'
  }
]

export interface ILanguage {
  symbol: string
  name: string
}
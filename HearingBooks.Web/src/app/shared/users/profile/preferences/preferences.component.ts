import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { PreferencesActions } from 'src/app/preferences/preferences.actions';
import { IPreferencesState } from 'src/app/preferences/preferences.reducer';
import { selectInnerCardType } from 'src/app/preferences/preferences.selectors';
import { CardType } from 'src/app/shared/card/card.component';
import StoreConnectedComponent from 'src/app/shared/store-connected.component';

@Component({
  selector: 'hb-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreferencesComponent extends StoreConnectedComponent<IPreferencesState> {
  @Input() preferencesFormGroup!: FormGroup
  
  public innerCardBorder = true
  public innerCardType!: CardType

  public get acrylicFormControl(): FormControl {
    return this.preferencesFormGroup.get('acrylic') as FormControl
  }

  constructor(store$: Store<IPreferencesState>) {
    super(store$)
    this.store$.select(selectInnerCardType).subscribe(x => this.innerCardType = x)
  }

  public setAcrylic(value: boolean): void {
    this.store$.dispatch(PreferencesActions.isAcrylicEnabledToggled({ isAcrylicEnabled: value }))
  }
}

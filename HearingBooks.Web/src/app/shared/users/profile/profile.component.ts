import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectInnerCardType, selectIsAcrylicEnabled, selectMainCardType } from 'src/app/preferences/preferences.selectors';
import { CardType } from '../../card/card.component';
import { IApplicationState } from '../../state';
import StoreConnectedComponent from '../../store-connected.component';

@Component({
  selector: 'hb-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends StoreConnectedComponent<IApplicationState> {
  public titleTranslationKey: string = 'Profile.Title'

  public mainCardType!: CardType
  public innerCardType!: CardType
  public acrylic!: boolean

  private formGroupNames = {
    details: 'details',
    preferences: 'preferences'
  }

  private preferencesNames = {
    acrylic: 'acrylic'
  }

  private profileFormGroup!: FormGroup

  public get preferencesFormGroup(): FormGroup {
    return this.getFormPart(this.formGroupNames.preferences) as FormGroup
  }

  private get acrylicFormControl(): FormControl {
    return this.getFormPart(this.formGroupNames.preferences).get(this.preferencesNames.acrylic) as FormControl
  }

  private getFormPart(key: string): AbstractControl {
    return this.profileFormGroup.get(key)!
  }

  constructor(store$: Store<IApplicationState>, private formBuilder: FormBuilder) {
    super(store$)
    this.createProfileFormGroup()
    this.store$.select(selectMainCardType).subscribe(mainCardType => this.mainCardType = mainCardType)
    this.store$.select(selectInnerCardType).subscribe(innerCardType => this.innerCardType = innerCardType)
    this.store$.select(selectIsAcrylicEnabled).subscribe(acrylicEnabled => {
      this.acrylic = acrylicEnabled
      this.acrylicFormControl.setValue(this.acrylic)
      this.profileFormGroup.updateValueAndValidity()
    })
  }

  private createProfileFormGroup(): void {
    this.profileFormGroup = this.formBuilder.group({
      [this.formGroupNames.details]: this.formBuilder.group({

      }),
      [this.formGroupNames.preferences]: this.formBuilder.group({
        [this.preferencesNames.acrylic]: this.formBuilder.control(this.acrylic)
      })
    })
  }
}

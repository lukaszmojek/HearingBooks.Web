import { Component } from '@angular/core'
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms'
import { Store } from '@ngrx/store'
import { selectIsAcrylicEnabled } from 'src/app/preferences/preferences.selectors'
import AcrylicAwareComponent from '../../acrylic/acrylic-aware.component'
import { IMainComponent } from '../../main-component.interface'
import { IApplicationState } from '../../state'

@Component({
  selector: 'hb-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent
  extends AcrylicAwareComponent
  implements IMainComponent
{
  titleTranslationKey: string = 'Profile.Title'
  elevation = true
  divider: boolean = true
  border: boolean = false

  private formGroupNames = {
    details: 'details',
    preferences: 'preferences',
  }

  private preferencesNames = {
    acrylic: 'acrylic',
  }

  private profileFormGroup: FormGroup

  constructor(
    store$: Store<IApplicationState>,
    private formBuilder: FormBuilder
  ) {
    super(store$)
    this.createProfileFormGroup()
    this.safeSelect$(selectIsAcrylicEnabled).subscribe(_ => {
      this.acrylicFormControl.setValue(this.isAcrylicEnabled)
      this.profileFormGroup.updateValueAndValidity()
    })
  }

  get preferencesFormGroup(): FormGroup {
    return this.getFormPart(this.formGroupNames.preferences) as FormGroup
  }

  private get acrylicFormControl(): FormControl {
    return this.getFormPart(this.formGroupNames.preferences).get(
      this.preferencesNames.acrylic
    ) as FormControl
  }

  private getFormPart(key: string): AbstractControl {
    return this.profileFormGroup.get(key)!
  }

  private createProfileFormGroup(): void {
    this.profileFormGroup = this.formBuilder.group({
      [this.formGroupNames.details]: this.formBuilder.group({}),
      [this.formGroupNames.preferences]: this.formBuilder.group({
        [this.preferencesNames.acrylic]: this.formBuilder.control(
          this.isAcrylicEnabled
        ),
      }),
    })
  }
}

import { Component } from '@angular/core'
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms'
import { Store } from '@ngrx/store'
import { selectUserDetails } from 'src/app/auth/auth.selectors'
import { IUser } from 'src/app/auth/models'
import { selectIsAcrylicEnabled } from 'src/app/preferences/preferences.selectors'
import { IUIState } from 'src/app/ui/ui.reducer'
import AcrylicAwareComponent from '../../acrylic/acrylic-aware.component'
import { AcrylicService } from '../../acrylic/acrylic.service'
import { IMainComponent } from '../../main-component.interface'
import { IApplicationState } from '../../state'

@Component({
  selector: 'hb-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent
  extends AcrylicAwareComponent<IApplicationState>
  implements IMainComponent {
  titleTranslationKey: string = 'Profile.Title'
  elevation = true
  divider: boolean = true
  border: boolean = false

  private formGroupNames = {
    details: 'details',
    preferences: 'preferences',
  }

  private detailsNames = {
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
  }

  private preferencesNames = {
    acrylic: 'acrylic',
    language: 'langauge',
    emailNotifications: 'emailNotifications'
  }

  private profileFormGroup: FormGroup

  constructor(
    store$: Store<IApplicationState>,
    acrylic: AcrylicService,
    private formBuilder: FormBuilder,
  ) {
    super(store$, acrylic)
    this.createProfileFormGroup()
    this.safeSelect$(selectIsAcrylicEnabled).subscribe(_ => {
      this.acrylicFormControl.setValue(this.isAcrylicEnabled)
      this.profileFormGroup.updateValueAndValidity()
    })
    this.safeSelect$(selectUserDetails).subscribe((details: IUser) => {
      this.firstNameFormControl.setValue(details.firstName)
      this.firstNameFormControl.disable()
      this.lastNameFormControl.setValue(details.lastName)
      this.lastNameFormControl.disable()
      this.emailFormControl.setValue(details.email)
      this.emailFormControl.disable()
      this.profileFormGroup.updateValueAndValidity()
    })
  }

  get profileDetailsFormGroup(): FormGroup {
    return this.getFormPart(this.formGroupNames.details) as FormGroup
  }

  private get firstNameFormControl(): FormControl {
    return this.getFormPart(this.formGroupNames.details).get(
      this.detailsNames.firstName
    ) as FormControl
  }

  private get lastNameFormControl(): FormControl {
    return this.getFormPart(this.formGroupNames.details).get(
      this.detailsNames.lastName
    ) as FormControl
  }

  private get emailFormControl(): FormControl {
    return this.getFormPart(this.formGroupNames.details).get(
      this.detailsNames.email
    ) as FormControl
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
      [this.formGroupNames.details]: this.formBuilder.group({
        [this.detailsNames.firstName]: this.formBuilder.control(
          ''
        ),
        [this.detailsNames.lastName]: this.formBuilder.control(
          ''
        ),
        [this.detailsNames.email]: this.formBuilder.control(
          ''
        ),
      }),
      [this.formGroupNames.preferences]: this.formBuilder.group({
        [this.preferencesNames.acrylic]: this.formBuilder.control(
          this.isAcrylicEnabled
        ),
        // [this.preferencesNames.language]: this.formBuilder.control(
        //   this.isAcrylicEnabled
        // ),
        [this.preferencesNames.emailNotifications]: this.formBuilder.control(
          false
        ),
      }),
    })
  }
}

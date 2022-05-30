import { Component, Input } from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms'
import { Store } from '@ngrx/store'
import { IPreferencesState } from 'src/app/preferences/preferences.reducer'
import { selectInnerCardType, selectLanguage } from 'src/app/preferences/preferences.selectors'
import { CardType } from 'src/app/shared/card/card-type'
import StoreConnectedComponent from 'src/app/shared/store-connected.component'

@Component({
  selector: 'hb-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss'],
})
export class ProfileDetailsComponent extends StoreConnectedComponent<IPreferencesState> {
  @Input() profileDetailsFormGroup: FormGroup

  public innerCardBorder = false
  public innerCardType: CardType
  public selectedLanguage: string

  public get firstNameFormControl(): FormControl {
    return this.profileDetailsFormGroup.get('firstName') as FormControl
  }

  public get lastNameFormControl(): FormControl {
    return this.profileDetailsFormGroup.get('lastName') as FormControl
  }

  public get emailFormControl(): FormControl {
    return this.profileDetailsFormGroup.get('email') as FormControl
  }

  constructor(store$: Store<IPreferencesState>) {
    super(store$)
    this.safeSelect$(selectInnerCardType).subscribe(
      x => (this.innerCardType = x)
    )
    this.safeSelect$(selectLanguage).subscribe(x => (this.selectedLanguage = x))
  }
}

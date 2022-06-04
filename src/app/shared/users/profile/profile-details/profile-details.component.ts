import { Component, Input } from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'
import { Store } from '@ngrx/store'
import { IPreferencesState } from 'src/app/preferences/preferences.reducer'
import { selectInnerCardType, selectLanguage } from 'src/app/preferences/preferences.selectors'
import { CardType } from 'src/app/shared/card/card-type'
import StoreConnectedComponent from 'src/app/shared/store-connected.component'
import { TopUpDialogComponent } from '../top-up-dialog/top-up-dialog.component'

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

  public get balanceFormControl(): FormControl {
    return this.profileDetailsFormGroup.get('balance') as FormControl
  }

  constructor(store$: Store<IPreferencesState>, private dialog: MatDialog) {
    super(store$)
    this.safeSelect$(selectInnerCardType).subscribe(
      x => (this.innerCardType = x)
    )
    this.safeSelect$(selectLanguage).subscribe(x => (this.selectedLanguage = x))
  }

  public openTopUpDialog(): void {
    this.dialog.open(TopUpDialogComponent, { width: '400px', height: '250px' })
  }
}

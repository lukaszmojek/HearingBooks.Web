import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAuthState } from 'src/app/auth/auth.reducer';
import { selectUserId } from 'src/app/auth/auth.selectors';
import { PreferencesActions } from 'src/app/preferences/preferences.actions';
import StoreConnectedComponent from '../../shared/store-connected.component';
import { UserService } from '../user.service';

class SimpleErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    if (!control) {
      return false
    }

    const isSubmitted = form && form.submitted
    const isControlChangedOrSubmitted = control.dirty || control.touched || isSubmitted

    return !!(control && control.invalid && isControlChangedOrSubmitted)
  }
}

@Component({
  selector: 'hb-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.sass']
})
export class ChangePasswordComponent extends StoreConnectedComponent<IAuthState> implements OnInit {
  public oldPasswordFormControl = new FormControl('', [Validators.required]);
  public newPasswordFormControl = new FormControl('', [Validators.required]);
  public newRePasswordFormControl = new FormControl('', [Validators.required]);

  public matcher = new SimpleErrorStateMatcher();

  private currentUserId$: Observable<string>
  private currentUserId: string


  constructor(
    store$: Store<IAuthState>,
    private userService: UserService,
  ) {
    super(store$)
  }

  ngOnInit(): void {
    // this.currentUserId$ = this.safeSelect$(selectUserId)
    this.safeSelect$(selectUserId).subscribe(userId => {
      this.currentUserId = userId
    })
  }

  public get arePasswordsValid(): boolean {
    return this.oldPasswordFormControl.valid &&
      this.newPasswordFormControl.valid &&
      this.newRePasswordFormControl.valid;
  }

  public async changePassword() {
    const newPassword = this.newPasswordFormControl.value;
    const oldPassword = this.oldPasswordFormControl.value;
    this.userService.changePassword(this.currentUserId, oldPassword, newPassword).subscribe(
      () => {
        this.resetForms();
      }
    )
  }

  private resetForms() {
    this.oldPasswordFormControl.reset();
    this.newPasswordFormControl.reset();
    this.newRePasswordFormControl.reset();
  }
}

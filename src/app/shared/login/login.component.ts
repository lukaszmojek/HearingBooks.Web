import { Component } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { AuthActions } from 'src/app/auth/auth.actions'
import AcrylicAwareComponent from '../acrylic/acrylic-aware.component'
import { AcrylicService } from '../acrylic/acrylic.service'
import { IMainComponent } from '../main-component.interface'
import { IApplicationState } from '../state'
import { SimpleErrorStateMatcher } from './simple-error-state-matcher'

@Component({
  selector: 'hb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends AcrylicAwareComponent<IApplicationState> implements IMainComponent {
  titleTranslationKey = 'Login.Title'
  divider: true
  elevation: false
  border: false
  isLoggedIn: boolean

  emailFormControl = new FormControl('', [Validators.required, Validators.email])
  passwordFormControl = new FormControl('', [Validators.required])

  matcher = new SimpleErrorStateMatcher()


  get areEmailAndPasswordValid(): boolean {
    return this.emailFormControl.valid && this.passwordFormControl.valid
  }

  get emailNotValid(): boolean {
    return this.emailFormControl.hasError('email') &&
      !this.emailFormControl.hasError('required')
  }

  get emailNotProvided(): boolean {
    return this.emailFormControl.hasError('required')
  }


  constructor(store$: Store<IApplicationState>, acrylicService: AcrylicService, private router: Router) {
    super(store$, acrylicService)
  }

  public logIn() {
    this.store$.dispatch(
      AuthActions.logIn({
        email: this.emailFormControl.value,
        password: this.passwordFormControl.value
      })
    )
  }
}

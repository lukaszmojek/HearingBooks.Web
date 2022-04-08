import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms'
import { ErrorStateMatcher } from '@angular/material/core'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { AuthActions } from 'src/app/auth/auth.actions'
import { selectIsLoggedIn } from 'src/app/auth/auth.selectors'
import AcrylicAwareComponent from '../acrylic/acrylic-aware.component'
import { AcrylicService } from '../acrylic/acrylic.service'
import { IMainComponent } from '../main-component.interface'
import { IApplicationState } from '../state'

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
  selector: 'hb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends AcrylicAwareComponent<IApplicationState> implements OnInit, IMainComponent {
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

  ngOnInit(): void {
    this.subscribeToIsLoggedIn()
  }

  public logIn() {
    this.store$.dispatch(
      AuthActions.logIn({
        email: this.emailFormControl.value,
        password: this.passwordFormControl.value
      })
    )
  }

  private subscribeToIsLoggedIn(): void {
    this.safeSelect$(selectIsLoggedIn).subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn

      if (this.isLoggedIn) {
        this.router.navigateByUrl('/dashboard')
      }
    })
  }
}

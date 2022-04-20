import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router'
import { Store } from '@ngrx/store'
import { iif, Observable, of, switchMap } from 'rxjs'
import { IAuthState } from './auth.reducer'
import { selectIsLoggedIn } from './auth.selectors'

type GuardOutcome = boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad, CanActivate, CanActivateChild {
  constructor(private store$: Store<IAuthState>, private router: Router) { }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): GuardOutcome {
    return this.guard()
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): GuardOutcome {
    return this.guard()
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): GuardOutcome {
    return this.guard()
  }

  private guard(): GuardOutcome {
    return this.store$.select(selectIsLoggedIn)
    // .pipe(
    //   switchMap(isLoggedIn =>
    //     iif(
    //       () => isLoggedIn,
    //       of(true),
    //       of(this.router.createUrlTree(['login']))
    //     ))
    // )
  }
}

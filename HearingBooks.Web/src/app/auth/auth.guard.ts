import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router'
import { Store } from '@ngrx/store'
import { catchError, map, Observable } from 'rxjs'
import { IAuthState } from './auth.reducer'
import { selectIsLoggedIn } from './auth.selectors'

type GuardOutcome = boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad, CanActivate {
  constructor(private store$: Store<IAuthState>, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): GuardOutcome {
    return this.guard()
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): GuardOutcome {
    return this.guard()
  }

  private guard(): GuardOutcome {
    //TODO: Check if this will work properly with iif from rxjs
    return this.store$.select(selectIsLoggedIn)
    // .pipe(
    //   map(isLoggedIn => {
    //     if (isLoggedIn) {
    //       return isLoggedIn
    //     }
    //   })
    // )
  }
}

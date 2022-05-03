import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { iif, Observable, of, switchMap } from 'rxjs';
import { IAuthState } from './auth.reducer';
import { selectIsLoggedIn } from './auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
  constructor(private store$: Store<IAuthState>, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store$.select(selectIsLoggedIn)
      .pipe(
        switchMap(isLoggedIn =>
          iif(
            () => isLoggedIn,
            of(this.router.createUrlTree(['text-syntheses'])),
            of(true)
          ))
      )
  }
}

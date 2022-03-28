import { Injectable } from '@angular/core'
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router'
import { Observable } from 'rxjs'
import { AuthorizationService } from './authorization.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private auth: AuthorizationService, private router: Router) { }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.auth.isAuthorized) {
      return true
    }

    this.router.navigate(['login'])
    return false
  }
}

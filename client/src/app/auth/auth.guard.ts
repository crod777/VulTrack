

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, from, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const guardType = route.data['guardType'];

    if (guardType === 'admin') {
      return this.canAdmin();
    } else {
      return this.authService.isAuthenticated('vultrack').pipe(
        map(isAuthenticated => {
          if (!isAuthenticated) {
            return false;
          }
          return true;
        })
      );
    }
  }

  canAdmin(): Observable<boolean> {
    return this.authService.isAuthenticated('vultrack').pipe(
      switchMap(isAuthenticated => {
        if (!isAuthenticated) {
          return of(false);
        }
        return this.authService.getUserData('vultrack').pipe(
          map(userData => {
            if (userData && userData.isAdmin) {
              return true;
            }
            this.router.navigate(['/unauthorized']);
            return false;
          })
        );
      })
    );
  }
}


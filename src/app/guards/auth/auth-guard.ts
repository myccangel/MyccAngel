import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { AppState } from 'src/store/AppState';
import { LoginState } from 'src/store/login/LoginState';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.store.select('login').pipe(
      take(1),
      switchMap((loginState: LoginState) => {
        if (loginState.isLoggedIn) {
          return of(true);
        }
        this.router.navigateByUrl('login');
        return of(false);
      })
    );
  }
}

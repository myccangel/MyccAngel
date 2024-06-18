import { LoginState } from './../../../store/login/LoginState';
import { CanLoad, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap, take } from 'rxjs';
import { AppState } from 'src/store/AppState';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanLoad{

  constructor(private store: Store<AppState>, private router: Router) { }
  canLoad(): Observable<boolean>{
    return this.store.select('login').pipe(
      take(1),
      switchMap(LoginState => {
        if(LoginState.isLoggedIn){
          return of(true)
        }
        this.router.navigateByUrl('login')
        return of(false);
      })
    )
  }
}

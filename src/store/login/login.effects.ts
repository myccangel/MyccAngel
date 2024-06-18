import { recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from 'src/store/login/login.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { AuthService } from '../../app/services/auth/auth.service';
import { login, loginSuccess, loginFail } from './login.actions';

@Injectable()
export class LoginEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      mergeMap(action =>
        this.authService.login(action.email, action.password).pipe(
          map((response: any) => loginSuccess({ user: response.user })), // Adjust mapping here
          catchError(error => of(loginFail({ error })))
        )
      )
    )
  );
recoverPassword$ = createEffect(() =>
  this.actions$.pipe(
    ofType(recoverPassword),
    mergeMap((payload: { email: string }) =>
      this.authService.recoverEmailPassword(payload.email).pipe(
        map(() => recoverPasswordSuccess()),
        catchError(error => of(recoverPasswordFail({ error })))
      )
    )
  )
);
}

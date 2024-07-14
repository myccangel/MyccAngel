import { recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from 'src/store/login/login.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { AuthService } from '../../app/services/auth/auth.service';
import { register, registerFail, registerSuccess } from './register.actions';

@Injectable()
export class RegisterEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {}

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(register),
      mergeMap(action =>
        this.authService.register(action.userRegister).pipe(
          map(() => registerSuccess()),
          catchError(error => of(registerFail({ error })))
        )
      )
    )
  );

}

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { register, registerFail, registerSuccess } from './register.actions';

@Injectable()
export class RegisterEffects {

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(register),
      switchMap(action =>
        this.authService.register(action.userRegister).pipe(
          map(() => registerSuccess()),
          catchError(error => of(registerFail({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {}
}

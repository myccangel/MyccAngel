import { Observable, of, throwError } from "rxjs";
import { LoginEffects } from "./login.effects";
import { EffectsModule } from "@ngrx/effects";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { login, loginFail, loginSuccess, recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from "./login.actions";
import { Action, StoreModule } from "@ngrx/store"; // Import Action from @ngrx/store
import { AuthService } from "src/app/services/auth/auth.service";
import { User } from "src/app/model/user/User";

// Rest of the code remains the same

describe('Login effects', () => {
  let effects: LoginEffects;
  let actions$: Observable<Action>;
  let error = {error: 'error'};
  let user= new User();
  user.id = "anyUserId";
  let authServiceMock = {
    recoverEmailPassword: (email: string) =>{
      if (email == "error@email.com"){
        return throwError(error);
      }
      return of({});
    },
    login: (email: string, password: string) =>{
      if (email == "error@email.com"){
        return throwError(error);
      }
      return of({user});
    }
  }


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot([]),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([
          LoginEffects
        ])
      ],
      providers: [
        provideMockActions(() => actions$)
      ]
    }).overrideProvider(AuthService, {useValue: authServiceMock})
    effects = TestBed.get(LoginEffects);
  });

  it('should recover password with existing email return success', (done) => {
    actions$ = of(recoverPassword({email: 'any@email.com'}));

    effects.recoverPassword$.subscribe((newAction: any) => {
      expect(newAction).toEqual(recoverPasswordSuccess());
      done();
    });
  })

  it('should recover password with not existing email return error', (done) => {
    actions$ = of(recoverPassword({email: 'error@email.com'}));

    effects.recoverPassword$.subscribe((newAction: any) => {
      expect(newAction).toEqual(recoverPasswordFail({error}));
      done();
    });
  })

  it('should login with  valid credentials return success', (done) => {
    actions$ = of(login({email: 'any@email.com', password: "anyPassword"}));

    effects.login$.subscribe((newAction: any) => {
      expect(newAction).toEqual(loginSuccess({user}));
      done();
    });
  })

  it('should login with  invalid credentials return error', (done) => {
    actions$ = of(login({email: 'error@email.com', password: "anyPassword"}));

    effects.login$.subscribe((newAction: any) => {
      expect(newAction).toEqual(loginFail({error}));
      done();
    });
  })

});



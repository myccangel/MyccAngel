import { Observable, of, throwError } from "rxjs";
import { EffectsModule, Actions } from "@ngrx/effects";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action, StoreModule } from "@ngrx/store";
import { AuthService } from "src/app/services/auth/auth.service";
import { User } from "src/app/model/user/User";
import { RegisterEffects } from "./register.effects";
import { UserRegister } from "src/app/model/user/UserRegister";
import { register, registerFail, registerSuccess } from "./register.actions";

describe('Register effects', () => {
  let effects: RegisterEffects;
  let actions$: Observable<Action>;
  let error = { error: 'error' };
  let user = new User();
  user.id = "anyUserId";

  let authServiceMock = {
    register(userRegister: UserRegister) {
      return new Observable<void>(observer => {
        if (userRegister.email === "error@email.com") {
          observer.error({ message: "Email already registered" });
        } else {
          observer.next();
          observer.complete();
        }
      });
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([RegisterEffects])
      ],
      providers: [
        provideMockActions(() => actions$),
        { provide: AuthService, useValue: authServiceMock }
      ]
    });

    effects = TestBed.get(RegisterEffects);
  });

  it('should return success on register', (done) => {
    actions$ = of(register({ userRegister: new UserRegister() }));

    effects.register$.subscribe((newAction: Action) => {
      expect(newAction).toEqual(registerSuccess());
      done();
    });
  });

  it('should return error on register', (done) => {
    const userRegister = new UserRegister();
    userRegister.email = "error@email.com";
    actions$ = of(register({ userRegister }));

    effects.register$.subscribe((newAction: Action) => {
      expect(newAction).toEqual(registerFail({ error: { message: "Email already registered" } }));
      done();
    });
  });
});

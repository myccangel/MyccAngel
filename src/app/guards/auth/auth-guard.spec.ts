import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth-guard';
import { Store, StoreModule } from '@ngrx/store';
import { loginReducer } from 'src/store/login/login.reducers';
import { AppState } from 'src/store/AppState'; // Corrected import path
import { loginSuccess } from 'src/store/login/login.actions';
import { User } from 'src/app/model/user/User';
import { Router, RouterModule } from '@angular/router';
import { of } from 'rxjs';

describe('AuthGuardService', () => {
  let guard: AuthGuard;
  let store: Store<AppState>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        StoreModule.forRoot({}),
        StoreModule.forFeature('login', loginReducer)
      ],
      providers: [
        AuthGuard,
        { provide: Router, useValue: { navigateByUrl: jasmine.createSpy('navigateByUrl') } } // Provide a mock router
      ]
    });
    guard = TestBed.inject(AuthGuard);
    store = TestBed.inject(Store);
    router = TestBed.inject(Router);
  });

  it('should allow logged user to access page', () => {
    store.dispatch(loginSuccess({ user: new User() }));
    guard.canActivate().subscribe(isAllowed => {
      expect(isAllowed).toBeTruthy();
    });
  });

  it('should not allow access to page if the user is not logged in', () => {
    guard.canActivate().subscribe(isAllowed => {
      expect(isAllowed).toBeFalsy();
    });
  });

  it('should redirect user to the login page if not logged in', () => {
    // No need to spy here since it's already spied in the provider setup
    guard.canActivate().subscribe(() => {
      expect(router.navigateByUrl).toHaveBeenCalledWith('login');
    });
  });
});

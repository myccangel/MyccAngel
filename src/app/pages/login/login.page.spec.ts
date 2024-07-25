import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { IonicModule, ToastController, NavController } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { Store, StoreModule } from '@ngrx/store';
import { loadingReducer } from 'src/store/loading/loading.reducers';
import { loginReducer } from 'src/store/login/login.reducers';
import { AppState } from 'src/store/AppState';
import { login, loginFail, loginSuccess, recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from 'src/store/login/login.actions';
import { User } from 'src/app/model/user/User';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let router: Router;
  let page: any;
  let store: Store<AppState>;
  let toastController: ToastController;
  let navController: NavController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [
        IonicModule.forRoot(),
        AppRoutingModule,
        ReactiveFormsModule,
        StoreModule.forRoot([]),
        StoreModule.forFeature('loading', loadingReducer),
        StoreModule.forFeature('login', loginReducer),
        AngularFireModule.initializeApp(environment.firebaseConfig)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    router = TestBed.inject(Router);
    store = TestBed.inject(Store);
    toastController = TestBed.inject(ToastController);
    navController = TestBed.inject(NavController);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;

    fixture.detectChanges();  // Initial fixture detect changes
  }));

  it('should create a form on ngOnInit()', () => {
    component.ngOnInit();
    expect(component.form).not.toBeUndefined();
  });

  it('should navigate to register page on register button click', () => {
    spyOn(router, 'navigate');
    component.register();
    expect(router.navigate).toHaveBeenCalledWith(['register'], { state: jasmine.anything() });
  });

  it('should start password recovery and show loading', () => {
    component.form.get('email')?.setValue('valid@email.com');
    component.forgotEmailPassword();
    store.select('login').subscribe(loginState => {
      expect(loginState.isRecoveringPassword).toBeTruthy();
    });
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeTruthy();
    });
  });

  it('should handle successful password recovery', async () => {
    spyOn(toastController, 'create').and.returnValue(Promise.resolve({ present: () => {} } as any));
    store.dispatch(recoverPassword({ email: 'any@email.com' }));
    store.dispatch(recoverPasswordSuccess());

    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();
    });

    expect(toastController.create).toHaveBeenCalledWith({
      position: 'bottom',
      message: 'Recovery email sent',
      color: 'primary',
      duration: 2000
    });
  });

  it('should handle failed password recovery', () => {
    spyOn(toastController, 'create').and.returnValue(<any> Promise.resolve({ present: () => {} }));

    // Simulate a failed password recovery
    store.dispatch(recoverPasswordFail({ error: { message: 'error message' } }));

    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();
    });

    // Verify that the toastController's create method was called with the expected parameters
    expect(toastController.create).toHaveBeenCalledWith({
      position: 'bottom',
      message: 'error message',
      color: 'danger',
      duration: 2000
    });
  });
  it('should show loading and start login process', () => {
    component.form.get('email')?.setValue('valid@email.com');
    component.form.get('password')?.setValue('anyPassword');
    component.login();

    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeTruthy();
    });

    store.select('login').subscribe(loginState => {
      expect(loginState.isLoggingIn).toBeTruthy();
    });
  });

  it('should handle successful login', () => {
    spyOn(navController, 'navigateRoot');
    store.dispatch(login({ email: 'any@email.com', password: 'anyPassword' }));
    store.dispatch(loginSuccess({ user: new User() }));

    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();
    });

    store.select('login').subscribe(loginState => {
      expect(loginState.isLoggedIn).toBeTruthy();
    });

    expect(navController.navigateRoot).toHaveBeenCalledWith('profile');
  });

  it('should handle failed login', async () => {
    spyOn(toastController, 'create').and.returnValue(Promise.resolve({ present: () => {} } as any));
    store.dispatch(login({ email: 'error@email.com', password: 'anyPassword' }));
    store.dispatch(loginFail({ error: { message: 'error message' } }));

    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();
    });

    expect(toastController.create).toHaveBeenCalledWith({
      position: 'bottom',
      message: 'error message',
      color: 'danger',
      duration: 2000
    });
  });
});

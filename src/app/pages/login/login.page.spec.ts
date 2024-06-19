
import { LoadingState } from 'src/store/loading/LoadingState';
import { AuthService } from './../../services/auth/auth.service';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { IonicModule, ToastController } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { Store, StoreModule } from '@ngrx/store';
import { loadingReducer } from 'src/store/loading/loading.reducers';
import { loginReducer } from 'src/store/login/login.reducers';
import { AppState } from 'src/store/AppState';
import { login, loginFail, loginSuccess, recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from 'src/store/login/login.actions';
import * as loadingActions from 'src/store/loading/loading.actions'; // Import loading actions
import { User } from 'src/app/model/user/User';
import { Observable, observable, of, throwError } from 'rxjs';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let router: Router;
  let page:any;
  let store: Store<AppState>;
  let toastController: ToastController;
 // let authService: AuthService;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage], // Add LoginPage to declarations
      imports: [
        IonicModule.forRoot(),
        AppRoutingModule,
        ReactiveFormsModule,
        StoreModule.forRoot([]), // Initialize StoreModule
        StoreModule.forFeature("loading", loadingReducer),
        StoreModule.forFeature("login", loginReducer),
        AngularFireModule.initializeApp(environment.firebaseConfig)
      ]
        }).compileComponents();
    fixture = TestBed.createComponent(LoginPage);
    router = TestBed.inject(Router); // Use TestBed.inject() instead of TestBed.get()
    store = TestBed.get(Store);
    toastController = TestBed.get(ToastController);
    //authService = TestBed.get(AuthService);
    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;
  }));
  it('should create a form on ngOnInit()', () => {
    component.ngOnInit();
    expect(component.form).not.toBeUndefined();
  });
  /*it('should go to home page on login button', () => {
    spyOn(router, 'navigate');
    component.login();
    expect(router.navigate).toHaveBeenCalledWith(['profile']);
  });
*/
  it('It should go to register page on register button', () => {
    spyOn(router, 'navigate');
    component.register();
    expect(router.navigate).toHaveBeenCalledWith(['register']);
  });
  it('It should recover  email/password on forgot email/password', () => {
    //spyOn(authService, 'recoverEmailPassword').and.returnValue(new Observable(()=>{}));
    // Start page
    // User set valid email
    // User clicked on Forgot email/password button
    // Expect loginState.isRecoveringPassword is true
    fixture.detectChanges();
    component.form.get('email')?.setValue("valid@email.com");
    page.querySelector('#recoverPasswordButton').click();
    store.select('login').subscribe(loginState =>{
      expect(loginState.isRecoveringPassword).toBeTruthy();
    })
    store.select('loading').subscribe(loadingState =>{
      expect(loadingState.show).toBeTruthy();
    })
  })
 /* it('It should show loading when recovering password', () => {
    // Start page
    // change  isRecoveringPassword to true
    // Verify loadingState.show == true

    fixture.detectChanges();
    store.dispatch(recoverPassword());
    store.select('loading').subscribe(loadingState =>{
      expect(loadingState.show).toBeTruthy();
    })
  }) */
  it('Given user is recovering password, when success, then hide loading and show success message', () => {
    spyOn(toastController, 'create').and.returnValue(<any> Promise.resolve({present: ()=>{}}));
    // Start page
    // Set login state as recovering password
    // Set login state as recovered password
    // Verify loadingState.show == false
    // Verify message was shown
    fixture.detectChanges();
    store.dispatch(recoverPassword({email: 'any@email.com'}));
    store.dispatch(recoverPasswordSuccess());
    store.select('loading').subscribe(loadingState =>{
      expect(loadingState.show).toBeFalsy();
    })
    expect(toastController.create).toHaveBeenCalledTimes(1);
  })
  it('Given user is recovering password, when fail, then hide loading and show error message', () => {
    spyOn(toastController, 'create').and.returnValue(<any> Promise.resolve({present: ()=>{}}));
    // Start page
    // recover password
    // recover password fail
    // Expect loading not showing
    // Verify error message was shown
    fixture.detectChanges();
    store.dispatch(recoverPassword({email: 'any@email.com'}));
    store.dispatch(recoverPasswordFail({error: "message"}));
    store.select('loading').subscribe(loadingState =>{
      expect(loadingState.show).toBeFalsy();
    })
    expect(toastController.create).toHaveBeenCalledTimes(1);
  })
  it('It should show loading and start login when logging in', () =>{
   // spyOn(authService, 'login').and.returnValue(new Observable(()=>{}));
    // Start page
    // Set valid Email
    // Set any password
    // Click on Login Button
    // expect loading  is showing
    // expect user loggin in
    fixture.detectChanges();
    component.form.get('email')?.setValue('valid@email.com');
    component.form.get('password')?.setValue('anyPassword');
    page.querySelector('#loginButton').click();
    store.select('loading').subscribe(loadingState =>{
      expect(loadingState.show).toBeTruthy();
    })
    store.select('login').subscribe(loginState =>{
      expect(loginState.isLoggingIn).toBeTruthy();
    })
  })
  it('Given user is loggingin, when success, then hide loading and send user to profile page', () =>{
    spyOn(router, 'navigate');
    //spyOn(authService, 'login').and.returnValue(of(new User()))
    // Start page
    // Set valid Email
    // Set any password
    // Click on Login Button
    // expect loading  is hidden
    // expect user loggin in
    // user sent to home page
    //component.form.get('email')?.setValue('valid@email.com');
    //component.form.get('password')?.setValue('anyPassword');
    //page.querySelector('#loginButton').click();

    fixture.detectChanges();
    store.dispatch(login({email: 'any@email.com', password: "anyPassword"}));
    store.dispatch(loginSuccess({user: new User()}));

    store.select('loading').subscribe(loadingState =>{
      expect(loadingState.show).toBeFalsy();
    })
    store.select('login').subscribe(loginState =>{
      expect(loginState.isLoggedIn).toBeTruthy();
    })
    expect(router.navigate).toHaveBeenCalledWith(['profile'])
  })

  it('Given user is loggingin, when fail, then hide loading and show error message', () =>{
    spyOn(toastController, 'create').and.returnValue(<any> Promise.resolve({present: ()=>{}}));
    //spyOn(authService, 'login').and.returnValue(throwError({ message: 'error' }));
    // Start page
    // Set valid Email
    // Set any password
    // Click on Login Button
    // expect loading  is hidden
    // expect user loggin in
    // user sent to home page
    //component.form.get('email')?.setValue('error@email.com');
    //component.form.get('password')?.setValue('anyPassword');
    //page.querySelector('#loginButton').click();
    fixture.detectChanges();
    store.dispatch(login({email: 'error@email.com', password: 'anyPassword'}));
    store.dispatch(loginFail({error:{message: 'error message'}}));
    store.select('loading').subscribe(loadingState =>{
      expect(loadingState.show).toBeFalsy();
    })
    expect(toastController.create).toHaveBeenCalledTimes(1);
  })

});

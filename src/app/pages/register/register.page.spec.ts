import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RegisterPage } from './register.page';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterPageModule } from './register.module';
import { Store, StoreModule, props } from '@ngrx/store';
import { AppState } from 'src/store/AppState'; // Correct path to AppState
import { loadingReducer } from 'src/store/loading/loading.reducers'; // Correct path to reducers
import { registerReducer } from 'src/store/register/register.reducers'; // Correct path to reducers
import { UserRegister } from 'src/app/model/user/UserRegister'; // Correct path to UserRegister
import { register, registerFail, registerSuccess } from 'src/store/register/register.actions'; // Correct path to actions
import { loginReducer } from 'src/store/login/login.reducers';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  let router: Router;
  let page: any; // Adjust typing if needed
  let store: Store<AppState>;
  let toastController: ToastController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterPage],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule.withRoutes([
          { path: 'profile', loadChildren: () => import('./../../pages/profile/profile.module').then(m => m.ProfilePageModule) }
        ]),
        ReactiveFormsModule,
        RegisterPageModule,
        StoreModule.forRoot([]),
        StoreModule.forFeature('loading', loadingReducer),
        StoreModule.forFeature('login', loginReducer),
        StoreModule.forFeature('register', registerReducer)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPage);
    router = TestBed.inject(Router);
    store = TestBed.inject(Store);
    toastController = TestBed.inject(ToastController);
    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;
  }));

  it('should create register form on page init', () => {
    fixture.detectChanges();
    expect(component.registerForm).toBeDefined();
  });

  it('should not be allowed to register with invalid form', () => {
    fixture.detectChanges();
    clickOnRegisterButton();
    store.select('register').subscribe(state => {
      expect(state.isRegistering).toBeFalsy();
    });
  });

  it('Given form is valid, when user clicks on register, then register', () => {
    fixture.detectChanges();
    fillForm();
    spyOn(router, 'navigate');
    clickOnRegisterButton();
    store.select('register').subscribe(state => {
      expect(state.isRegistering).toBeTruthy();
    });
  });

  it('Given form is valid, when user clicks on register, to show loading', () => {
    fixture.detectChanges();
    fillForm();
    spyOn(router, 'navigate');
    clickOnRegisterButton();
    store.select('loading').subscribe(state => {
      expect(state.show).toBeTruthy();
    });
  });

  it('Should hide loading component when registration is successful', () => {
    fixture.detectChanges();
    store.dispatch(register({ userRegister: new UserRegister() }));
    store.dispatch(registerSuccess());
    store.select('loading').subscribe(state => {
      expect(state.show).toBeFalsy();
    });
  });
  it('Should hide loading component when registration is fails', () => {
    fixture.detectChanges();
    store.dispatch(register({ userRegister: new UserRegister() }));
    store.dispatch(registerFail({error: {message: 'any response'}}));
    store.select('loading').subscribe(state => {
      expect(state.show).toBeFalsy();
    });
  });

  it('Should login when registration is successful', () => {
    fixture.detectChanges();
    store.dispatch(register({ userRegister: new UserRegister() }));
    store.dispatch(registerSuccess());
    store.select('login').subscribe(state =>{
      expect(state.isLoggingIn).toBeTruthy();

    })
  });

  it('Should show error when registration fails', () => {
    fixture.detectChanges();
    spyOn(toastController, 'create').and.returnValue(<any>Promise.resolve({present: ()=>{}}));
    store.dispatch(register({ userRegister: new UserRegister() }));
    store.dispatch(registerFail({error: {message: 'any response'}}));
    expect(toastController.create).toHaveBeenCalled();
  });

  function clickOnRegisterButton() {
    page.querySelector('ion-button').click();
  }

  function fillForm() {
    component.registerForm.getForm().get('name')?.setValue('anyName');
    component.registerForm.getForm().get('email')?.setValue('any@email.com');
    component.registerForm.getForm().get('password')?.setValue('anyPassword');
    component.registerForm.getForm().get('repeatPassword')?.setValue('anyPassword');
    component.registerForm.getForm().get('phone')?.setValue('anyPhone');
    component.registerForm.getForm().get('address')?.get('street')?.setValue('any Street');
    component.registerForm.getForm().get('address')?.get('number')?.setValue('any number');
    component.registerForm.getForm().get('address')?.get('complement')?.setValue('any complement');
    component.registerForm.getForm().get('address')?.get('city')?.setValue('any city');
    component.registerForm.getForm().get('address')?.get('zipCode')?.setValue('any zipCode');
    component.registerForm.getForm().get('address')?.get('country')?.setValue('any country');
  }
});

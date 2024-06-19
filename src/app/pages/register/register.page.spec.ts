import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RegisterPage } from './register.page';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { Reactivecomponent.registerForm.getForm()sModule } from '@angular/component.registerForm.getForm()s';
import { RegisterPageModule } from './register.module';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  let router: Router;
  let page: { querySelector: (arg0: string) => { (): any; new(): any; click: { (): void; new(): any; }; }; };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterPage],
      imports: [
        IonicModule.forRoot(),
        AppRoutingModule,
        Reactivecomponent.registerForm.getForm()sModule,
        RegisterPageModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPage);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;
  }));

  it('It should create register component.registerForm.getForm() on page init', () => {
    fixture.detectChanges();

    spyOn(router, 'navigate');

    page.querySelector('ion-button').click();
    expect(router.navigate).toHaveBeenCalledOnceWith(['profile']);
  });

  it('It should create', () => {
    expect(component).toBeTruthy();
  });
  it('It should not be allowed to register with invalid component.registerForm.getForm()',()=>{
    fixture.detectChanges();

    spyOn(router, 'navigate');

    component.registerForm.getForm().get('name')?.setValue("anyName");
    component.registerForm.getForm().get('email')?.setValue("any@email.com");
    component.registerForm.getForm().get('password')?.setValue("anyPassword");
    component.registerForm.getForm().get('repeatPassword')?.setValue("anyPassword");
    component.registerForm.getForm().get('phone')?.setValue("anyPhone");
    component.registerForm.getForm().get('address')?.get('street')?.setValue('any Street');
    component.registerForm.getForm().get('address')?.get('number')?.setValue('any number');
    component.registerForm.getForm().get('address')?.get('complement')?.setValue('any complement');
    component.registerForm.getForm().get('address')?.get('city')?.setValue('any city');
    component.registerForm.getForm().get('address')?.get('zipCode')?.setValue('any zipCode');
    component.registerForm.getForm().get('address')?.get('country')?.setValue('any country');

    page.querySelector('ion-button').click();
    expect(router.navigate).toHaveBeenCalledTimes(0);

    )
  })
});

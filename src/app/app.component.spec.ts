import { TestBed, ComponentFixture, waitForAsync, fakeAsync, tick } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let nativeElement: HTMLElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
  });

  it('should create the app', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

/*  it('should have menu labels', fakeAsync(() => {
    fixture.detectChanges();
    tick(); // Simulate the passage of time for async operations

    const menuItems = nativeElement.querySelectorAll('ion-label');
    expect(menuItems.length).toEqual(7);
    expect(menuItems[0]!.textContent!.trim()).toContain('About Us');
    expect(menuItems[1]!.textContent!.trim()).toContain('About IDB');
    expect(menuItems[2]!.textContent!.trim()).toContain('Doctors');
    expect(menuItems[3]!.textContent!.trim()).toContain('Dietition');
    expect(menuItems[4]!.textContent!.trim()).toContain('Donate');
    expect(menuItems[5]!.textContent!.trim()).toContain('IDB ChatBot');
    expect(menuItems[6]!.textContent!.trim()).toContain('Contact Us');
  }));


  it('should have urls', fakeAsync(() => {
    fixture.detectChanges();
    tick(); // Simulate the passage of time for async operations

    const menuItems = nativeElement.querySelectorAll('ion-item');
    expect(menuItems.length).toEqual(7);
    menuItems.forEach((item: HTMLElement) => {
      expect(item.getAttribute('ng-reflect-router-link')).toEqual('/home');
    });
  }));
  */
});

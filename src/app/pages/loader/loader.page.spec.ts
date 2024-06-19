import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LoaderPage } from './loader.page';
import { Router } from '@angular/router';

describe('LoaderPage', () => {
  let component: LoaderPage;
  let fixture: ComponentFixture<LoaderPage>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoaderPage],
      providers: [
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoaderPage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    fixture.detectChanges(); // initialize component's lifecycle hooks
    expect(component).toBeTruthy();
  });

  it('should redirect to home page', fakeAsync(() => {
    fixture.detectChanges(); // initialize component's lifecycle hooks
    tick(1000); // simulate the passage of 1 second
    expect(router.navigate).toHaveBeenCalledWith(['home']);
  }));
});

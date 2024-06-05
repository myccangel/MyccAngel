import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home.page';
import { Router } from '@angular/router';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let router: Router;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    router = TestBed.get(Router)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('it should go to all records', () => {
    spyOn(router, 'navigate');

    component.allrecords();

    expect(router.navigate).toHaveBeenCalledWith(['records']);
  });
  it('it should go to login page', () => {
    spyOn(router, 'navigate');

    component.login();

    expect(router.navigate).toHaveBeenCalledWith(['login']);
  });
  it('it should go to signup page', () => {
    spyOn(router, 'navigate');

    component.signup();

    expect(router.navigate).toHaveBeenCalledWith(['register']);
  });
});

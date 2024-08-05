import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToiletNavigatorPage } from './toilet-navigator.page';

describe('ToiletNavigatorPage', () => {
  let component: ToiletNavigatorPage;
  let fixture: ComponentFixture<ToiletNavigatorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ToiletNavigatorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

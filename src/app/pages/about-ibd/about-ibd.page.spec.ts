import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutIbdPage } from './about-ibd.page';

describe('AboutIbdPage', () => {
  let component: AboutIbdPage;
  let fixture: ComponentFixture<AboutIbdPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutIbdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

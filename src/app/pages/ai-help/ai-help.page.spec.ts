import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AiHelpPage } from './ai-help.page';

describe('AiHelpPage', () => {
  let component: AiHelpPage;
  let fixture: ComponentFixture<AiHelpPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AiHelpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

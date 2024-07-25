import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactFormPage } from './contact-form.page';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastController } from '@ionic/angular';
import { of } from 'rxjs';

// Mock class for AngularFirestore
class AngularFirestoreMock {
  collection() {
    return {
      add: jasmine.createSpy('add').and.returnValue(Promise.resolve()), // Mocking the add method
    };
  }
}

describe('ContactFormPage', () => {
  let component: ContactFormPage;
  let fixture: ComponentFixture<ContactFormPage>;
  let firestore: AngularFirestoreMock; // Declare a variable for the mocked Firestore

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactFormPage],
      providers: [
        { provide: AngularFirestore, useClass: AngularFirestoreMock }, // Provide the mock class
        ToastController // You can mock this as needed too
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

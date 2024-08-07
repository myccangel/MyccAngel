import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterPageForm } from './form/register.page.form';
import { Store } from '@ngrx/store';
import { AppState } from 'src/store/AppState';
import { register } from 'src/store/register/register.actions';
import { Subscription } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { login } from 'src/store/login/login.actions';
import { RegisterState } from 'src/store/register/RegisterState';
import { hide, show } from 'src/store/loading/loading.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit, OnDestroy {
  registerForm!: RegisterPageForm;
  registerStateSubscription: Subscription | undefined;
  currentStep: number = 1;
  years: number[] = [];
  selectedFile: any;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private toastController: ToastController,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state?.['formData']) {
      const formData = navigation.extras.state['formData'];
      this.registerForm.getForm().patchValue({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        repeatPassword: formData.repeatPassword
      });
    }
    this.generateYearsList(); // Generate the list of years when component initializes
    this.watchRegisterState();
  }

  ngOnDestroy() {
    if (this.registerStateSubscription) {
      this.registerStateSubscription.unsubscribe();
    }
  }

  nextStep() {
    if (this.currentStep < 11) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  register() {
    this.registerForm.getForm().markAllAsTouched();
    if (this.registerForm.getForm().valid) {
      const formValue = this.registerForm.getForm().value;
      this.store.dispatch(register({ userRegister: formValue }));
      // Wait for the state to be updated before navigating to the last step
      this.registerStateSubscription = this.store.select('register').subscribe(state => {
        if (state.isRegistered) {
          this.currentStep = 11; // Navigate to the last step
        }
      });
    }
  }

  private createForm() {
    this.registerForm = new RegisterPageForm(this.formBuilder);
  }

  private watchRegisterState() {
    this.registerStateSubscription = this.store.select('register').subscribe(state => {
      this.toggleLoading(state);
      this.onRegister(state);
      this.onError(state);
    });
  }

  private onRegister(state: RegisterState) {
    if (state.isRegistered && this.currentStep === 11) {
      this.store.dispatch(login({
        email: this.registerForm.getForm().value.email,
        password: this.registerForm.getForm().value.password
      }));
    }
  }

  private onError(state: RegisterState) {
    if (state.error) {
      this.toastController.create({
        message: state.error.message,
        duration: 5000,
        header: 'Registration not done!'
      }).then(toast => toast.present());
    }
  }

  private toggleLoading(state: RegisterState) {
    if (state.isRegistering) {
      this.store.dispatch(show());
    } else {
      this.store.dispatch(hide());
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.registerForm.patchValue({
        medicalReport: file
      });
    }
  }

  private generateYearsList() {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 100;
    this.years = Array.from({ length: currentYear - startYear + 1 }, (_, i) => startYear + i);
  }
}

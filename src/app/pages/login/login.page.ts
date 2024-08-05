import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { NavController, ToastController, AlertController } from '@ionic/angular';
import { AppState } from 'src/store/AppState';
import { hide, show } from 'src/store/loading/loading.actions';
import { login, recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from 'src/store/login/login.actions';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoginState } from 'src/store/login/LoginState';
import { LoginPageForm } from './login.page.form';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  form: FormGroup = this.formBuilder.group({});
  loginStateSubscription: Subscription | undefined;

  constructor(
    private navController: NavController,
    private router: Router,
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private toastController: ToastController,
    private authService: AuthService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.form = new LoginPageForm(this.formBuilder).createForm();
    this.loginStateSubscription = this.store.select('login').subscribe(loginState => {
      this.onIsRecoveredPassword(loginState);
      this.onIsRecoveringPassword(loginState);
      this.toggleLoading(loginState);
      this.onError(loginState);
      this.onIsLoggedIn(loginState);
    });

    this.setupTabClickListeners();
  }

  ngOnDestroy() {
    if (this.loginStateSubscription) {
      this.loginStateSubscription.unsubscribe();
    }
  }

  private setupTabClickListeners() {
    const signUpTab = document.querySelector('label[for="tab-2"]');
    if (signUpTab) {
      signUpTab.addEventListener('click', () => this.register());
    }
  }

  private toggleLoading(loginState: LoginState) {
    if (loginState.isLoggingIn || loginState.isRecoveringPassword) {
      this.store.dispatch(show());
    } else {
      this.store.dispatch(hide());
    }
  }

  private onIsRecoveringPassword(loginState: LoginState) {
    if (loginState.isRecoveringPassword) {
      const email = this.form.get('email')?.value;
      this.authService.recoverEmailPassword(email).subscribe(
        () => {
          this.store.dispatch(recoverPasswordSuccess());
        },
        (error: any) => {
          this.store.dispatch(recoverPasswordFail({ error }));
        }
      );
    }
  }

  private onIsLoggedIn(loginState: LoginState) {
    if (loginState.isLoggedIn) {
      this.navController.navigateRoot('profile');
    }
  }

  private async onError(loginState: LoginState) {
    if (loginState.error) {
      const toaster = await this.toastController.create({
        position: 'bottom',
        message: loginState.error.message,
        color: 'danger',
        duration: 2000
      });
      toaster.present();
    }
  }

  private async onIsRecoveredPassword(loginState: LoginState) {
    if (loginState.isRecoveredPassword) {
      const toaster = await this.toastController.create({
        position: "bottom",
        message: "Recovery email sent",
        color: "primary",
        duration: 2000
      });
      toaster.present();
    }
  }

  forgotEmailPassword() {
    this.store.dispatch(recoverPassword({ email: this.form.get('email')?.value }));
  }

  login() {
    const email = this.form.get('email')?.value;
    const password = this.form.get('password')?.value;
    this.store.dispatch(login({ email, password }));
  }

  async register() {
    const alert = await this.alertController.create({
      header: 'Sign Up',
      message: 'Do you Have Inflammatory Bowel Disease (IBD)?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.navigateToRegister();
          }
        },
        {
          text: 'No',
          handler: () => {
            this.showNotEligibleAlert();
          }
        }
      ]
    });

    await alert.present();
  }

  async showNotEligibleAlert() {
    const alert = await this.alertController.create({
      header: 'Thank you for your interest in our platform.',
      message: 'This website is specifically designed to support individuals with Inflammatory Bowel Disease (IBD). Since you have indicated that you do not have IBD, you will not be able to create an account. If you are a caregiver or seeking more information about IBD, please visit our public resources section here. We appreciate your understanding.',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate(['home']);
          }
        }
      ]
    });

    await alert.present();
  }

  navigateToRegister() {
    const formData = {
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value,
      repeatPassword: this.form.get('repeatPassword')?.value,
      name: this.form.get('name')?.value
    };
    this.router.navigate(['register'], { state: { formData } });
  }
}

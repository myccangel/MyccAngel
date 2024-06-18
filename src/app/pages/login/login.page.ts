  import { LoginState } from './../../../store/login/LoginState';
  import { Component, OnDestroy, OnInit } from '@angular/core';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { Router } from '@angular/router';
  import { LoginPageForm } from './login.page.form';
  import { Store } from '@ngrx/store';
  import { AppState } from 'src/store/AppState';
  import { hide, show } from 'src/store/loading/loading.actions';
  import { login, loginFail, loginSuccess, recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from 'src/store/login/login.actions';
  import { ToastController } from '@ionic/angular';
  import { Subscription } from 'rxjs';
  import { AuthService } from 'src/app/services/auth/auth.service';

  @Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
  })
  export class LoginPage implements OnInit, OnDestroy {

    form: FormGroup = this.formBuilder.group({}); // Initialize with an empty form group
    loginStateSubscription: Subscription | undefined;

    constructor(
      private router: Router,
      private formBuilder: FormBuilder,
      private store: Store<AppState>,
      private toastController: ToastController,
      private authService: AuthService // Add this line

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
    }

    ngOnDestroy() {
      if (this.loginStateSubscription) {
        this.loginStateSubscription.unsubscribe();
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
        this.router.navigate(['home']);
      }
    }

    private async onError(loginState: LoginState) {
      if (loginState.error) {
        const toaster = await this.toastController.create({
          position: "bottom",
          message: loginState.error.message,
          color: "danger",
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
      this.store.dispatch(recoverPassword({email: this.form.get('email')?.value}));
    }

    login() {
      const email = this.form.get('email')?.value;
      const password = this.form.get('password')?.value;
      this.store.dispatch(login({ email, password }));
    }

    register() {
      this.router.navigate(['register']);
    }
  }

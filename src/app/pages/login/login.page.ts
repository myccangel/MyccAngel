import { AuthService } from './../../services/auth/auth.service';
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

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {

  form: FormGroup = this.formBuilder.group({}); // Initialize with an empty form group
  loginStateSubscription: Subscription | undefined;

  constructor(private router: Router, private formBuilder: FormBuilder, private store:Store<AppState>,
    private toastController: ToastController, private authService: AuthService) {}

  ngOnInit() {
    this.form = new LoginPageForm(this.formBuilder).createForm();
    this.loginStateSubscription = this.store.select('login').subscribe( loginState=>{
      this.onIsRecoveredPassword(loginState);
      this.onIsRecoveringPassword(loginState);

      this.toggleLoading(loginState);
      this.onError(loginState);

      this.onIsLoggingIn(loginState);
      this.onIsLoggedIn(loginState);
    })

  }
  ngOnDestroy()  {
    if(this.loginStateSubscription){
      this.loginStateSubscription.unsubscribe();
    }

  }

  private toggleLoading(loginState: LoginState){
    if(loginState.isLoggingIn || loginState.isRecoveringPassword){
      this.store.dispatch(show());
    }else{
      this.store.dispatch(hide());
    }
  }
  private onIsLoggingIn(loginState: LoginState){
    if(loginState.isLoggingIn ){
      const email = this.form.get('email')?.value;
      const password = this.form.get('password')?.value;
      this.authService.login(email,password).subscribe(user =>{
        this.store.dispatch(loginSuccess({user}));
      }, error =>{
        this.store.dispatch(loginFail({error}));
      })
    }
  }
  private onIsLoggedIn(loginState: LoginState){
    if(loginState.isLoggedIn){
      this.router.navigate(['home']);
    }
  }

  private async onError(loginState: LoginState) {
    if(loginState.error){
      const toaster = await this.toastController.create({
        position:"bottom",
        message: loginState.error.message,
        color: "danger"
      });
      toaster.present();
    }

  }

  private onIsRecoveringPassword(loginState: LoginState) {
    if(loginState.isRecoveringPassword){


      this.authService.recoverEmailPassword(this.form.get('email')?.value).subscribe(()=>{
        this.store.dispatch(recoverPasswordSuccess());
      }, error => {
        this.store.dispatch(recoverPasswordFail({error}))

      });
    }

  }
  private async onIsRecoveredPassword(loginState: LoginState) {
    if(loginState.isRecoveredPassword){

      const toaster = await this.toastController.create({
        position:"bottom",
        message:"Recovery email sent",
        color: "primary"
      });
      toaster.present();
    }

  }


  forgotEmailPassword(){
    this.store.dispatch(recoverPassword());

  }
    /*if (this.form.valid) {
      // Perform login logic here
      this.router.navigate(['home']);
    } else {
      // Handle form validation errors
      console.error('Form is invalid');
      this.markAllAsTouched();
    } */
  login() {
    this.store.dispatch(login());
  }

  register() {
    this.router.navigate(['register']);
  }

/* private markAllAsTouched() {
    this.form.markAllAsTouched();
  } */
}

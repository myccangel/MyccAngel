import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

export class RegisterPageForm {
  private formBuilder: FormBuilder;
  private form: FormGroup;

  constructor(formBuilder: FormBuilder) {
    this.formBuilder = formBuilder;
    this.form = this.createForm();
  }

  private createForm(): FormGroup {
    const form = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(7)]],
      repeatPassword: [''],
      address: this.formBuilder.group({
        street: ['', [Validators.required]],
        number: ['', [Validators.required]],
        complement: ['', [Validators.required]],
        city: ['', [Validators.required]],
        zipCode: ['', [Validators.required]],
        country: ['', [Validators.required]]
      })
    });

    form.get('repeatPassword')?.setValidators(this.matchPasswordAndRepeatPassword(form));

    return form;
  }

  getForm(): FormGroup {
    return this.form;
  }

  private matchPasswordAndRepeatPassword(form: FormGroup): ValidatorFn {
    return () => {
      const password = form.get('password');
      const repeatPassword = form.get('repeatPassword');

      return password && repeatPassword && password.value === repeatPassword.value
        ? null
        : { isntMatching: true };
    };
  }
}
